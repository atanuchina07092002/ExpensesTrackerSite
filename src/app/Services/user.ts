import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { userModel } from '../Models/userModel';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { authResponseModel } from '../Models/authResponseModel';

@Injectable({
  providedIn: 'root',
})
export class User {
  router = inject(Router);
  http = inject(HttpClient);
  baseUrl = 'https://localhost:44395/api/Auth/';
  currentSubject = new BehaviorSubject<string | null>(null);
  currentStatus = this.currentSubject.asObservable();

  login(loginUser: userModel): Observable<authResponseModel> {
    return this.http.post<authResponseModel>(this.baseUrl + 'login', loginUser).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        this.currentSubject.next('user');
      })
    );
  }
  register(loginUser: userModel): Observable<authResponseModel> {
    return this.http.post<authResponseModel>(this.baseUrl + 'register', loginUser).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        this.currentSubject.next('user');
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentSubject.next(null);
    this.router.navigate(['/login']);
  }
  isCredential(): boolean {
    return !!localStorage.getItem('token');
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
