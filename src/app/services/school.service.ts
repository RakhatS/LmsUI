import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from '../app-injection-tokens';
import { Class } from '../models/class';
import { School } from '../models/school';
import { TutorSubCLass } from '../models/tutorsubclass';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  urlSchool = this.apiUrl + '/api/School';
  urlClass = this.apiUrl + '/api/Class';
  urlTutor = this.apiUrl + '/api/Tutor';
  
  constructor( @Inject(AUTH_API_URL)private apiUrl:string,
  private router: Router,
  private tokenService: TokenService,
  private authService: AuthService,
  private http: HttpClient) { }


  getSchool(id:number): Observable<School> {
    return this.http.get<School>(`${this.urlSchool}/find/`+id);
  }
  getSchoolList(): Observable<School[]>{
    return this.http.get<School[]>(`${this.urlSchool}/getList`);
  }

  getClass(id:number): Observable<Class> {
    return this.http.get<Class>(`${this.urlClass}/get/`+id);
  }
  getSimpleClass(id:number): Observable<Class> {  
    return this.http.get<Class>(`${this.urlClass}/getSimple/`+id);
  }
  getSubjectByClassId(id:number): Observable<TutorSubCLass[]> {
    return this.http.get<TutorSubCLass[]>(`${this.urlClass}/getSubjectByClassId/`+id);
  }
  getTutorSubClByTutorId(id:number): Observable<TutorSubCLass[]> {
    return this.http.get<TutorSubCLass[]>(`${this.urlTutor}/getSubjectByTutor/`+id);
  }
  postCreateClass(cl: Class): Observable<Class>{
    return this.http.post<Class>(`${this.urlClass}/add`,cl);
  }

  postCreateSchool(sc: School): Observable<School>{
    return this.http.post<School>(`${this.urlSchool}/add`,sc);
  }


}
