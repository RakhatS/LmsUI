import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { School } from 'src/app/models/school';
import { Student } from 'src/app/models/student';
import { Subject } from 'src/app/models/subject';
import { Tutor } from 'src/app/models/tutor';
import { TutorSubCLass } from 'src/app/models/tutorsubclass';
import { AuthService } from 'src/app/services/auth.service';
import { SchoolService } from 'src/app/services/school.service';
import { SubjectService } from 'src/app/services/subject.service';
import * as EmailValidator from 'email-validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  student = new Student();
  tutor = new Tutor();
  account = new Account();
  role: number = -1;
  schools: School[] = [];
  ban_permission = false;
  tutorSubClasses : TutorSubCLass[] = [];
  subjectList : Subject[] = [];
  roles: string[] = ['Tutor', 'Student'];
  selected = null;
  
 
  select_class = 0;
  select_School_Tutor = 0; 
  select_School_Student = 0; 
  select_Tutor_Subject = 0;

  errorText : string = '';
  isError : boolean = false;

  emailIsExist = false;


  constructor(private schoolService: SchoolService,
    private authService: AuthService,
    private router: Router,
    private subjectService: SubjectService
    ) { }
 
  ngOnInit(): void {
    this.schoolService.getSchoolList().subscribe((s) => {
      this.schools = s;
      // this.select_School_Tutor = this.schools[0].id;
      // this.select_School_Student = this.schools[0].id;
      // this.select_Tutor_Subject = this.subjectList[0].id
      // // console.log(s);
      
    });
    this.getSubjectList();
  }

  emailIsExistFoo(){
    this.authService.isExistAccEmail(this.account.email).subscribe(x =>{
      this.emailIsExist = x;
      if(this.emailIsExist){
        this.isError = true;
        this.errorText = 'User with this email already exists';
      }
      else
        this.isError = false;
    })
    
  }

  valueChange(event: any) {
    if(this.selected === 'Student'){
      this.role = 1;
    }
    else if(this.selected === 'Tutor'){
      this.role = 0;
    }
  
    this.selected = event.target.value;
     
 
  }
 
  valueChangeSchoolTutor(event: any) {
    this.select_School_Tutor = Number(event.target.value);
  }
  valueChangeSchoolStudent(event: any) {
    this.select_School_Student = Number(event.target.value);
  }
  valueChangeClass(event: any) {
    this.select_class = Number(event.target.value);
  }
  valueChangeSubjectTutor(event: any){
    this.select_Tutor_Subject = Number(event.target.value);
  }
  getSchoolById(): School | undefined{
    
    return this.schools.find(s => s.id === this.select_School_Student);
  }
 

  submit(){
      if(!EmailValidator.validate(this.account.email)){
          this.errorText = 'Please enter a valid email';
          this.isError = true;
          return;
      }
      else if(this.account.password == null || this.account.password == ''){
        this.errorText = 'Enter password';
          this.isError = true;
          return;
      }
      else if(this.role == null || this.role == -1){
        this.errorText = 'Please select a role';
        this.isError = true;
        return; 
      }
      else
        this.isError = false;
      
      
      if(this.emailIsExist){
        this.isError = true;
        this.errorText = 'User with this email already exists';
        return;
      }
      else
        this.isError = false;
    if (this.role === 0){
        this.account.roles = [];
        this.account.roles.push(this.role);
        this.account.tutor = this.tutor;
        this.account.tutor.schoolId = this.select_School_Tutor;
        this.account.tutor.subjectId = this.select_Tutor_Subject;
        this.account.tutor.tutorSubClasses = this.tutorSubClasses; 
        if(this.account.tutor.surname == null || this.account.tutor.name == null ){
          this.isError = true;
          this.errorText = 'Please enter full name';
          return;
        }
        else if(this.account.tutor.schoolId == 0){
          this.isError = true;
          this.errorText = 'Please select a school';
          return;
        }
        else if(this.account.tutor.subjectId == 0){
          this.isError = true;
          this.errorText = 'Please select a subject'; 
          return;
        }
        else
          this.isError = false;

        console.log(this.account);
        this.authService.createAccount(this.account).subscribe(data => {
          this.router.navigate(['']);
        }, error => console.log(error));
        
    }
    else if (this.role === 1){
      this.account.roles = [];
      this.account.roles.push(this.role);
      this.account.student = this.student;
      this.account.student.schoolId = this.select_School_Student;
      this.account.student.classId = this.select_class;
      if(this.account.student.surname == null || this.account.student.name == null ){
        this.isError = true;
        this.errorText = 'Please enter full name';
        return;
      }
      else if(this.account.student.schoolId == 0){
        this.isError = true;
        this.errorText = 'Please select a school';
        return;
      }
      else if(this.account.student.classId == 0){
        this.isError = true;
        this.errorText = 'Please select a class'; 
        return;
      }
      else
        this.isError = false;
      this.authService.createAccount(this.account).subscribe(data => {
        this.router.navigate(['']);
      }, error => console.log(error));
    }
  }

  getSubjectList() {
    this.subjectService.getSubjectList().subscribe(res => this.subjectList = res);
  }

}
