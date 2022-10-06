import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
import { AUTH_API_URL } from '../app-injection-tokens';
import { Token } from '../models/token';
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { TokenService } from './token.service';
import { Account } from '../models/account';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http: HttpClient,
    @Inject(AUTH_API_URL)private apiUrl:string,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private tokenService: TokenService
  ) { }


  login(email: string, password: string):Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/api/Auth/login`,{
      email,password
    }).pipe(
        tap(token => {
          this.tokenService.setToken(token.access_token);      
        })
    )
  }

  isAuthenticated(): boolean {
    var token = this.tokenService.getToken();
   
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }
  logout(): void{
    this.tokenService.removeToken();
    this.router.navigate(['']);
  }

  check(): Observable<any>{
     
    return this.http.get(`${this.apiUrl}/api/Auth/myprofile`);
  }

  createAccount(account: Account): Observable<Account>{
    return this.http.post<Account>(`${this.apiUrl}/api/Auth/create`, account);
  }

  isExistAccEmail(email: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}/api/Auth/emailIsExist/?email=${email}`);
  }

}
