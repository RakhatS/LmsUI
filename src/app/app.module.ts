import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AUTH_API_URL } from './app-injection-tokens';
import { environment } from 'src/environments/environment';
import { JwtModule }  from '@auth0/angular-jwt';
import { ACCESS_TOKEN_KEY } from './services/token.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { StudentComponent } from './components/student/student.component';
import { HomeComponent } from './components/home/home.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { TutorComponent } from './components/tutor/tutor.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SubjectComponent } from './components/subject/subject.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NavComponent } from './components/nav/nav.component';
import { AdminComponent } from './components/admin/admin.component';



export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentComponent,
    HomeComponent,
    MyprofileComponent,
    TutorComponent,
    RegistrationComponent,
    SubjectComponent,
    StudentsListComponent,
    NotfoundComponent,
    NavComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    NgxPaginationModule,

    
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenWhiteListedDomains
      }
    })
  ],
  providers: [{
    provide: AUTH_API_URL,
    useValue: environment.Api
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
