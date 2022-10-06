import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { SubjectComponent } from './components/subject/subject.component';
import { AuthGuard } from './guards/auth.guard';


 
const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  {path: 'myprofile', component: MyprofileComponent, canActivate: [AuthGuard]},
  { path: 'registration', component: RegistrationComponent},
  { path: 'subject/:id', component: SubjectComponent, canActivate: [AuthGuard]},
  { path: 'students', component: StudentsListComponent, canActivate: [AuthGuard]},
  { path: 'admin-panel', component: AdminComponent, canActivate: [AuthGuard]},
  {path: '404', component: NotfoundComponent},
  {path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
