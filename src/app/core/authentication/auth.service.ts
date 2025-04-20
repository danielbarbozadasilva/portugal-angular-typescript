import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthResponse } from '../models/models.index';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public signIn(email: string, password: string): Observable<IAuthResponse> {
    const url = `${this.baseUrl}/auth/login`;
    return this.http.post<IAuthResponse>(url, { email, password });
  }

  public logout(userId: string): Observable<any> {
    const url = `${this.baseUrl}/auth/logout`;
    return this.http.post<any>(url, { _id: userId });
  }

  public refreshToken(userId: any): Observable<any> {
    const url = `${this.baseUrl}/auth/refresh-token`;
    return this.http.post<any>(url, { _id: userId });
  }

  public checkToken(token: string): Observable<any> {
    const url = `${this.baseUrl}/auth/check-token`;
    return this.http.post<any>(url, { token });
  }

  public resetPassword(email: string, recoveryCode: string, newPassword: string): Observable<any> {
    const url = `${this.baseUrl}/auth/reset-password`;
    return this.http.put<any>(url, { email, recoveryCode, newPassword });
  }

  public passwordRecovery(email: string): Observable<any> {
    const url = `${this.baseUrl}/auth/password-recovery`;
    return this.http.post<any>(url, { email });
  }
}
