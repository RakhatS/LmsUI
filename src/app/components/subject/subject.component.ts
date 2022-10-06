import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Grade } from 'src/app/models/grade';
import { Student } from 'src/app/models/student';
import { TutorSubCLass } from 'src/app/models/tutorsubclass';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  id: number;
  subject: TutorSubCLass = new TutorSubCLass();
  students: Student[] = [];
  grades: Grade[] = [];
  tutorName = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private subjectService: SubjectService,
    private studentService: StudentService
    ) { 
    this.id = activateRoute.snapshot.params['id'];    
  }

  ngOnInit(): void {
    this.getSubj();

  }

  getSubj(){
    this.subjectService.getSubTCByID(this.id).subscribe(res => {
      this.subject = res;

      
      this.studentService.getStudentsByClassID(res.classId).subscribe(res => {
        this.students = res;
        // console.log(res);
        
        this.students.forEach(element => {
          this.studentService.getGradesStudentBySubID(element.id, this.subject.id).subscribe(grades => {
            element.grades = grades;
           
            while (element.grades.length != 14){
              var gr = new Grade();
              gr.studentId = element.id;
              
              gr.tutorId = this.subject.tutorId!;
              gr.tutorSubCLassId = this.subject.id;
              element.grades.push(gr);
            }      
          });
        });
      });
      this.getTutorFullName();
    });
  }



  save(){
    
    this.students.forEach(student => {
      for (let index = 0; index < student.grades.length; index++) {
        if(student.grades[index].score >= 0 && student.grades[index].score <= 100 && student.grades[index].score != null ){
              this.grades.push(student.grades[index]);
              // console.log(student.grades[index]);
              
        }
        else if(student.grades[index].score == null) {
          if(student.grades[index].studentId != null && student.grades[index].id != null){
          this.subjectService.deleteGrade(student.grades[index].id).subscribe(x => {
            // console.log(student.grades[index]);
          });    
            
          }
        }
        
      }
      // console.log(student.grades);
      
    });

    
    this.subjectService.saveGrades(this.grades).subscribe(res =>{
      this.getSubj();
    });
    this.tutorName = '';
    this.grades = [];
  }

  getTutorFullName() {
   
    this.subjectService.getTutorSimple(this.subject.tutorId!).subscribe(res => {
      this.tutorName = res.surname + ' ' + res.name + ' ' + res.patronymic;
    });
    
  }
 
}
