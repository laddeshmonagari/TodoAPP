import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/UserDetails';
import { LoginUser } from '../../unauth/models/LoginUser';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService extends ApiService {

  login(loginData: LoginUser): Observable<any> {
    return this.post<LoginUser>("/Account/login",loginData);
  }

  register(registerData: LoginUser): Observable<any> {
    return this.post<LoginUser>("/Account/register",registerData);
  }

  signOut(): Observable<any> {
    localStorage.removeItem('token');
    return this.post("/Account/logout",{});
  }

  getActiveUser(): Observable<UserDetails> {
    return this.get<UserDetails>("/Account/GetUserDetails");
  }

  isAuthenticated():boolean {
    return !!localStorage.getItem('token');
  }

}
