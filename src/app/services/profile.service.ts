import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from '../app-injection-tokens';
import { Account } from '../models/account';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = this.apiUrl + '/api/Auth';


  constructor( @Inject(AUTH_API_URL)private apiUrl:string,
  private router: Router,
  private tokenService: TokenService,
  private authService: AuthService,
  private http: HttpClient) { }



  public getProfile(): Observable<Account>{
    return this.http.get<Account>(`${this.baseUrl}/myprofile`);
  }
}
