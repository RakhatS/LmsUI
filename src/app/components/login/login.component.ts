import { Component, OnInit } from '@angular/core';
import * as EmailValidator from 'email-validator';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';
import { NavComponent } from '../nav/nav.component';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginAcc: Login = new Login();
  errorText : string = '';
  isError : boolean = false;


  public get isLoggedIn(): boolean{
 
    return this.as.isAuthenticated();
  }

  constructor(private as: AuthService
    , private router: Router){
  
  }

  login(){    
        
  if(!EmailValidator.validate(this.loginAcc.email)){
    this.errorText = 'Please enter a valid email';
    this.isError = true;
    return;
  }
  else if(this.loginAcc.password == null || this.loginAcc.password == ''){
    this.errorText = 'Enter password';
    this.isError = true;
    return;
  }
  else
    this.isError = false;

    this.as.login(this.loginAcc.email, this.loginAcc.password)
    .subscribe(res =>{
      this.router.navigate(['myprofile']);
      Emitters.authEmitter.emit(true);
    },error =>{
      this.isError = true;
      this.errorText = 'Wrong login or password';
    })
  }

  ngOnInit(): void {
    
  }

 

}
