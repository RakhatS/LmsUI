import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from '../app-injection-tokens';
import { Grade } from '../models/grade';
import { Subject } from '../models/subject';
import { Tutor } from '../models/tutor';
import { TutorSubCLass } from '../models/tutorsubclass';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  urlTutorSubCLass = this.apiUrl + '/api/TutorSubCLass';
  urlTutor= this.apiUrl + '/api/Tutor';
  urlSubject= this.apiUrl + '/api/Subject';
  constructor(@Inject(AUTH_API_URL)private apiUrl:string,
  private http: HttpClient) {}
    
  getSubTCByID(id: number): Observable<TutorSubCLass> {
    return this.http.get<TutorSubCLass>(`${this.urlTutorSubCLass}/get/${id}`);
  }
  saveGrades(grades: Grade[]): Observable<Grade[]> {
    return this.http.post<Grade[]>(`${this.urlTutor}/saveGrades`,grades);
  }
  deleteGrade(id: number): Observable<Grade>{  
    return this.http.delete<Grade>(`${this.urlTutor}/deleteGrade/${id}`);
  }

  getSubjectList(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.urlSubject}/getList`);
  }
  getSubjectById(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.urlSubject}/get/${id}`);
  }
  getTutorSimple(id:number): Observable<Tutor> {
    return this.http.get<Tutor>(`${this.urlTutor}/getSimple/`+id);
  }

  postAddTutorSubClass(t : TutorSubCLass){
    return this.http.post<TutorSubCLass>(`${this.urlTutorSubCLass}/addSubject`, t);
  }
  postAddSubject(s: Subject): Observable<Subject> {
    return this.http.post<Subject>(`${this.urlSubject}/add`,s);
  }


  
}
