import { Component, Input, OnInit } from '@angular/core';
import { School } from 'src/app/models/school';
import { Tutor } from 'src/app/models/tutor';
import { TutorSubCLass } from 'src/app/models/tutorsubclass';
import { SchoolService } from 'src/app/services/school.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss']
})
export class TutorComponent implements OnInit {
  @Input() school!: School;
  @Input() tutor!: Tutor;
  @Input() email!: string;

  constructor(
    private schoolService: SchoolService,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
   this.getTutSub();
  //  console.log(this.tutor);
       
  }


  getTutSub() {
    this.schoolService.getTutorSubClByTutorId(this.tutor.id).subscribe(res => {
        this.tutor.tutorSubClasses = res;
    }, error => console.log());
    this.subjectService.getSubjectById(this.tutor.subjectId).subscribe(res => {
      this.tutor.subject = res;
    });
    
    
  }

}
