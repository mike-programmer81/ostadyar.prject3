import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'https://cloth-conviction-sticks-gamma.trycloudflare.com';

  constructor(private http: HttpClient) {}

  // ---------------------------------------------------------------------
  // ✅ گرفتن Token از localStorage
  // ---------------------------------------------------------------------
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ---------------------------------------------------------------------
  // 🔐 LOGIN → درخواست ورود و ذخیره Token
  // ---------------------------------------------------------------------
  login(
    username: string,
    password: string,
    role: 'teacher' | 'student'
  ): Observable<{ token: string }> {

    return this.http.post<{ token: string }>(
      `${this.baseUrl}/auth/login`,
      { username, password, role }
    ).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  // ---------------------------------------------------------------------
  // 🎓 دریافت درس‌های استاد با Authorization Token
  // ---------------------------------------------------------------------
  getMyCourses(): Observable<any> {
    const token = this.getToken();

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(
      `${this.baseUrl}/api/teachers/my-courses`,
      { headers }
    );
  }
}
