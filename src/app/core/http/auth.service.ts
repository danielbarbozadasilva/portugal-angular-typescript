import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  IAuthResponse,
  IResponseError,
  IDataResponse,
  ITokenResponse,
  IAuthParams,
} from '../models/models.index';
import { environment } from '../../../environments/environments';
import { Observable, catchError, throwError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiBaseUrl}/auth`;
  private readonly TOKEN_KEY = 'authToken';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public loginService(credentials: { email: string; password: string }): Observable<IAuthResponse> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<IAuthResponse>(url, credentials).pipe(
      tap((response) => {
        if (response?.data?.token) {
          this.storeToken(response.data.token);
        }
      }),
      catchError(this.handleError)
    );
  }

  public logoutService(credentials: { _id: string }): Observable<IDataResponse> {
    const url = `${this.baseUrl}/logout`;
    return this.http.post<IDataResponse>(url, credentials).pipe(
      tap(() => this.removeToken()),
      catchError(this.handleError)
    );
  }

  public refreshTokenService(id: string): Observable<ITokenResponse> {
    const url = `${this.baseUrl}/refresh-token`;
    return this.http.post<ITokenResponse>(url, { _id: id }).pipe(
      tap((response) => {
        if (response?.token) {
          this.storeToken(response.token);
        }
      }),
      catchError(this.handleError)
    );
  }

  public checkTokenService(credentials: { token: string }): Observable<ITokenResponse> {
    const url = `${this.baseUrl}/check-token`;
    return this.http.post<ITokenResponse>(url, credentials).pipe(
      catchError(this.handleError)
    );
  }

  public resetPasswordService(credentials: IAuthParams): Observable<IDataResponse> {
    const url = `${this.baseUrl}/reset-password`;
    return this.http.put<IDataResponse>(url, credentials).pipe(
      catchError(this.handleError)
    );
  }

  public passwordRecoveryService(credentials: { email: string }): Observable<IDataResponse> {
    const url = this.baseUrl + '/password-recovery';
    return this.http.post<IDataResponse>(url, credentials).pipe(
      catchError(this.handleError)
    );
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  public hasToken(): boolean {
    return !!this.getToken();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erro AuthService:', error);
    // Se for 401 Unauthorized, remove token e redireciona a /signin
    if (error.status === 401) {
      this.removeToken();
      this.router.navigate(['/signin']);
    }
    const errorResponse: IResponseError = {
      success: false,
      message: error.error?.message || error.message || 'Ocorreu um erro de autenticação desconhecido',
    };
    return throwError(() => errorResponse);
  }
}
