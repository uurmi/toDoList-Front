import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBALS, environment } from '../../environment';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private token!: string | null;
  private userId!: string | null;
  private authStatusListener = new Subject<boolean>();
  private BASE_URL = environment.baseUrl + GLOBALS.USER_URL;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  signIn(email: string, password: string) {
    const authData = { email: email, password: password };

    this.http
      .post(this.BASE_URL + GLOBALS.LOGIN, authData)
      .subscribe((response: any) => {
        const token = response.token;
        this.token = token;
        if (token) {
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);

          this.saveAuthData(token, response.userId);
          this.router.navigate(['/']);
        }
      });
  }

  createUser(email: string, password: string) {
    const authData = { email: email, password: password };
    this.http
      .post(this.BASE_URL + GLOBALS.SIGNUP, authData)
      .subscribe((response) => {
        this.router.navigate(['/']);
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();

    if (!authInformation) {
      return;
    }

    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.userId = authInformation.userId;
    this.authStatusListener.next(true);
    this.router.navigate(['/']);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token) {
      return;
    }
    return {
      token: token,
      userId: userId,
    };
  }

  private saveAuthData(token: string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}
