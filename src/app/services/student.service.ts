import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from '../app-injection-tokens';
import { Account } from '../models/account';
import { Grade } from '../models/grade';
import { Login } from '../models/login';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  urlStudent = this.apiUrl + '/api/Student';
  urlAdmin = this.apiUrl + '/api/Admin';
  constructor(private http: HttpClient,
    @Inject(AUTH_API_URL)private apiUrl:string) { }

    getGradesStudent(stud_id: number): Observable<Grade[]>{
      return this.http.get<Grade[]>(`${this.apiUrl}/api/Student/getGrades/${stud_id}`);
    }
    getStudentsByClassID(stud_id: number): Observable<Student[]>{
      return this.http.get<Student[]>(`${this.apiUrl}/api/Student/getByClassId/${stud_id}`);
    }
    getGradesStudentBySubID(stud_id: number, sub_id: number): Observable<Grade[]>{
      return this.http.get<Grade[]>(`${this.apiUrl}/api/Student/getGrades/${stud_id}/${sub_id}`);
    }

    getStudentsList(): Observable<Student[]>{
      return this.http.get<Student[]>(`${this.urlStudent}/getList`);
    }
    
    getAccountsList(): Observable<Account[]>{
      return this.http.get<Account[]>(`${this.urlAdmin}/getAccounts`);
    }
    
}
