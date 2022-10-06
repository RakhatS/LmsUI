import { Component, Input, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  authenticated: boolean = this.authService.isAuthenticated();
  accessRegistration = !this.authService.isAuthenticated();
  accessLogin = !this.authService.isAuthenticated();

  constructor(private authService: AuthService) { 
  
  }
  

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth:boolean)=>{
        this.authenticated = auth;
        this.accessRegistration = !auth;
        this.accessLogin = !auth;
      }
    );

  }
  logout(){

    this.authService.logout();
    this.authenticated = false;
    this.accessLogin = true;
    this.accessRegistration = true;
  }

}
