import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Class } from 'src/app/models/class';
import { Grade } from 'src/app/models/grade';
import { School } from 'src/app/models/school';
import { Student } from 'src/app/models/student';
import { TutorSubCLass } from 'src/app/models/tutorsubclass';
import { SchoolService } from 'src/app/services/school.service';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  @Input() student!: Student;
  @Input() school!: School;
  @Input() class!: Class;
  @Input() email!: string;
  grades: Grade[] = [];
  tutor_sub_class: TutorSubCLass[] = [];



  
  constructor(private schoolService: SchoolService,
    private studService: StudentService,
    private subjectService: SubjectService) {
   }

  ngOnInit(): void {
    this.ch(); 
    this.getGrades();
   
    
    
  }

  ch(){
    if(this.class.id == undefined){
      return;
    }

    this.schoolService.getSubjectByClassId(this.class.id).subscribe(subject => {
      this.tutor_sub_class = subject;
      this.tutor_sub_class.forEach(subject =>{
        this.subjectService.getTutorSimple(subject.tutorId!).subscribe(res => subject.tutor = res);
      
      });
    });

    
   
    
  }

  getGrades(){
    this.studService.getGradesStudent(Number(this.student.id)).subscribe(grade => {
      this.grades = grade;
    });
   

  }
  count = 0;

  getFilterGrades(sub_id: number): Grade[] | null {
    var f = this.grades.filter(x => x.tutorSubCLassId === sub_id);
    // while(f.length < 14){
    //   f.push(new Grade());
    // }
    this.count++;
    // console.log(this.count);
    
    return f;
  }

}
