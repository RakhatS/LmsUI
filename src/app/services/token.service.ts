import { Injectable } from '@angular/core';

export const ACCESS_TOKEN_KEY = 'lms_access_token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }



  setToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
  getToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  removeToken() {
  
    
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}
