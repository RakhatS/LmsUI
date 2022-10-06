import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Class } from 'src/app/models/class';
import { School } from 'src/app/models/school';
import { TutorSubCLass } from 'src/app/models/tutorsubclass';
import { SchoolService } from 'src/app/services/school.service';
import { TokenService } from 'src/app/services/token.service';
import { SubjectService } from 'src/app/services/subject.service';
import { Subject } from 'src/app/models/subject';
import { Tutor } from 'src/app/models/tutor';
import { isPlatformBrowser } from '@angular/common';
import { Account } from 'src/app/models/account';
import { StudentService } from 'src/app/services/student.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(private tokenService: TokenService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private schoolService: SchoolService,
    private subjectService: SubjectService,
    private studentService: StudentService) { }

  ngOnInit(): void {
    if(this.jwtHelper.decodeToken(this.tokenService.getToken()!).role != 'Admin'){
      this.router.navigate(['/404']);
    }
    this.loadSchoolList();
    this.loadSubjectList();
    
  }
// #######################################################Create CLass#############################################################
  schools: School[] = [];
  select_Class_School = 1;
  cl = new Class();
  openCreateClass = false;
  isErrorCreateClass = false;
  isErrorCreateClassText = '';
  valueChangeSchool(event: any){
      this.select_Class_School = Number(event.target.value);
  }
  loadSchoolList(){
      this.schoolService.getSchoolList().subscribe(data => {
        this.schools = data;
        // console.log(this.schools);
      });      
  }
  createClass(){
    if(this.schools.find(s => s.id === this.select_Class_School)?.classes.find(c => c.seria.toLowerCase() == this.cl.seria.toLowerCase() && c.number == this.cl.number))
    {
      this.isErrorCreateClass = true;
      this.isErrorCreateClassText = 'A class with the same number and series already exists in this class';       
    }
    else
      this.isErrorCreateClass = false;
    if(this.cl.number < 1 || this.cl.number > 11 || this.cl.number == null)
    {
      this.isErrorCreateClass = true;
      this.isErrorCreateClassText = 'Class range must be from 1 to 11';       
    }
    else
      this.isErrorCreateClass = false;
    if(this.cl.seria == null || this.cl.seria == ""){
      this.isErrorCreateClass = true;
      this.isErrorCreateClassText = 'Fields for entering a series must not be empty'; 
    }
    else
      this.isErrorCreateClass = false;
    this.cl.schoolId = this.select_Class_School;
    this.cl.seria = this.cl.seria.toUpperCase();
    var tsc: TutorSubCLass[] = [];
    this.cl.tutorSubClasses = tsc;
    this.schoolService.postCreateClass(this.cl).subscribe(x => {alert('Class successfully created');
    this.loadSchoolList()});
  }
// #######################################################Create TutorSubClass#############################################################

  t_s_cl = new TutorSubCLass();
  openAddSubjectForClass = false;
  select_t_s_cl_School = 1;
  subjectsList: Subject[] = [];
  isErrorCreateTutSubClassText = '';
  isErrorCreateTutSubClass = false;


  valueChangeT_S_ClSchool(event: any){
    // console.log(this.schools);
    this.select_t_s_cl_School = Number(event.target.value);
    this.t_s_cl.classId = 0;
}
  valueChangeT_S_Class(event: any){
    this.t_s_cl.classId = Number(event.target.value);
  }

  getSchoolClasses(): Class[] | null | undefined {
    return this.schools.find(c => c.id == this.select_t_s_cl_School)?.classes;
  }
  loadSubjectList() {
      this.subjectService.getSubjectList().subscribe(x => this.subjectsList = x);
  }
  valueChangeSubjects(event: any){
    this.t_s_cl.subjectId = Number(event.target.value);
    this.t_s_cl.tutorId = 0;    
  }
  valueChangeTutor(event: any){
    this.t_s_cl.tutorId = Number(event.target.value);
  }
  getTutorBySchoolAndSubject(){
    var f: Tutor[] = [];
    this.subjectsList.forEach(s =>{
      s.tutors.forEach(t => {
        if(t.schoolId == this.select_t_s_cl_School && t.subjectId == this.t_s_cl.subjectId)
          f.push(t);
      });
    });
    return f;
  }

  createTutorSubClass(){
      if(this.t_s_cl.classId == null || this.t_s_cl.subjectId == null || this.t_s_cl.tutorId == null || this.t_s_cl.tutorId == 0){
        this.isErrorCreateTutSubClassText = 'All options must be selected';
        this.isErrorCreateTutSubClass = true;
      }
      else this.isErrorCreateTutSubClass = false;
      this.subjectService.postAddTutorSubClass(this.t_s_cl).subscribe(x => {
        alert('Subject to class successfully added');
      }); 
    }


    // #######################################################Create School#############################################################
    openAddSchool = false;
    newSchool = new School();
    isErrorCreateSchoolText = '';
    isErrorCreateSchool = false;
    createSchool(){
      if(this.newSchool.name == null || this.newSchool.name == '')
      {
        this.isErrorCreateSchool = true;
        this.isErrorCreateSchoolText = 'Name School must not be empty';
        return;
      }
      else 
        this.isErrorCreateSchool = false;
      this.schoolService.postCreateSchool(this.newSchool).subscribe(x =>{
        alert('School successfully created');
      });
    }
     // #######################################################Create Subject#############################################################
     openAddSubject = false;
     newSubject = new Subject();
     isErrorCreateSubjectText = '';
     isErrorCreateSubject = false;
     createSubject(){
      if(this.newSubject.name == null || this.newSubject.name == '')
      {
        this.isErrorCreateSubject = true;
        this.isErrorCreateSubjectText = 'Name Subject must not be empty';
        return;
      }
      else 
        this.isErrorCreateSubject = false;
      this.subjectService.postAddSubject(this.newSubject).subscribe(x =>{ alert('Subject successfully created');});
    }


       // #######################################################-Account Subject-###########################################################

    accounts: Account[] = [];

    search!: string;
    searchRole = -1;
    isOpenStudentsList = false;

    page: number = 1;
    count: number = 0;
    tableSize: number = 10;


    getAccountsList(){
        this.studentService.getAccountsList().subscribe(accounts =>{
          this.accounts = accounts;
          // console.log(accounts);
          
        });
    }
    onTableDataChange(event: any) {
      this.page = event;
      // this.fetchPosts();
    }
  

    getAccounts(): Account[]{
      if(this.search != null && this.search != ''){
        var s = this.accounts.filter(a =>  
          a.email.toLowerCase().includes(this.search.toLowerCase()) ||
          a.id == Number(this.search) 
        );
        if(this.searchRole != -1)
          s = s.filter(a => a.roles[0] == this.searchRole);
        return s;
       
      } 
      if(this.searchRole != -1){
      var s = this.accounts.filter(a => a.roles[0] == this.searchRole);
      return s;
      }
      return this.accounts;
    }
    valueChangeRoleSearch(event: any) { 
        this.getAccounts();  
    }

    

}

