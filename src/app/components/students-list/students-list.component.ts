import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Student } from 'src/app/models/student';
import { SchoolService } from 'src/app/services/school.service';
import { StudentService } from 'src/app/services/student.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;

  search!: string;
  filterClass = 0;
  // #####################################################
  students: Student[] = [];


  constructor(
    private studentService: StudentService,
    private schoolService: SchoolService,
    private tokenService: TokenService,
    private jwtHelper: JwtHelperService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(this.jwtHelper.decodeToken(this.tokenService.getToken()!).role != 'Tutor' && this.jwtHelper.decodeToken(this.tokenService.getToken()!).role != 'Admin'){
      this.router.navigate(['/404']);
    }
    this.setStudList();
  }


  setStudList(){
    this.studentService.getStudentsList().subscribe(students => {
      this.students = students;
      this.students.forEach(student =>{
        this.schoolService.getSimpleClass(student.classId!).subscribe(cl =>{
            student.class = cl;          
        });
      });
    });
  }


  getStudents(): Student[]{
    if(this.search != null && this.search != ''){
      var s = this.students.filter(student =>  
        student.surname.toLowerCase().includes(this.search.toLowerCase()) ||
        student.name.toLowerCase().includes(this.search.toLowerCase()) ||
        student.patronymic?.toLowerCase().includes(this.search.toLowerCase()) ||
        student.school?.name.toLowerCase().includes(this.search.toLowerCase()) 
      );
      if(this.filterClass != 0 && this.filterClass != null){
        return s.filter(student => student.class?.number == this.filterClass);
        
      }
      return s;
    } 
    if(this.filterClass != 0 && this.filterClass != null){
      return this.students.filter(student => student.class?.number == this.filterClass );
  }
    return this.students;
  }

  onTableDataChange(event: any) {
    this.page = event;
    // this.fetchPosts();
  }

}
