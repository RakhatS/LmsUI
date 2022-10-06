import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Account } from 'src/app/models/account';
import { Tutor } from 'src/app/models/tutor';
import { Student } from 'src/app/models/student';
import { ProfileService } from 'src/app/services/profile.service';
import { SchoolService } from 'src/app/services/school.service';
import { School } from 'src/app/models/school';
import { Class } from 'src/app/models/class';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  account!: Account;
  tutor!: Tutor;
  student!: Student 
  school = new School();
  class = new Class();



  constructor(private profileService: ProfileService,
    private schoolService: SchoolService) { }

  ngOnInit(): void {
    this.getProfile();
 
    
  }

  getProfile() {
    this.profileService.getProfile().subscribe(profile => {
    this.account = profile;
      // console.log(profile);
    if(profile.tutor != null){
      this.tutor = profile.tutor;
      this.school.id =  this.tutor.schoolId;
    }
    if(profile.student != null){  
       this.student = profile.student;
       this.school.id =  this.student.schoolId!;
       if(this.student.classId != null){
        this.class.id = this.student.classId;
        this.getClass();
       }
    }
    this.getSchool();
    });
  }
  getSchool(){    
    this.schoolService.getSchool(this.school.id).subscribe(school => {
        this.school = school;
        // console.log(this.account);
     }); 
  }
  getClass(){
    this.schoolService.getClass(this.class.id).subscribe(cl => {
      this.class = cl;
    });
      
  }


}
