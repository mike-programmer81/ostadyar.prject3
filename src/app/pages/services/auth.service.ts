import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8081/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string, role: string): Observable<any> {

    const endpoint =
      role === 'student'
        ? `${this.baseUrl}/login-student`
        : `${this.baseUrl}/login-teacher`;

    return this.http.post(
      endpoint,
      { username, password },
      { withCredentials: true }
    );
  }

  // چون توکن در Cookie هست، این فقط بررسی می‌کنه که کوکی موجود هست یا نه
  isLoggedIn(): boolean {
    return document.cookie.includes('accessToken=');
  }
}
