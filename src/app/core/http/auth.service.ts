import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router
import {
  IAuthResponse,
  // IResponse, // Removed unused import
  IResponseError,
  IDataResponse, // Add missing import
  ITokenResponse, // Add missing import
  IAuthParams, // Add missing import
} from '../models/models.index';
import { environment } from '../../../environments/environments';
import { Observable, catchError, throwError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiBaseUrl}/auth`;
  private readonly TOKEN_KEY = 'authToken'; // Key for storing token in localStorage

  constructor(
    private http: HttpClient,
    private router: Router
  ) {} // Inject Router

  /**
   * Realiza login com e-mail e senha.
   * @param credentials objeto contendo { email, password }
   * @returns Observable<IAuthResponse | IResponseError>
   */
  public loginService(credentials: { email: string; password: string }): Observable<IAuthResponse> {
    // Return IAuthResponse on success
    const url = `${this.baseUrl}/login`;
    return this.http.post<IAuthResponse>(url, credentials).pipe(
      tap((response) => {
        // Store token on successful login
        if (response?.data?.token) {
          this.storeToken(response.data.token);
        }
      }),
      catchError(this.handleError) // Use generic handler
    );
  }

  /**
   * Realiza logout para o usuário.
   * @param credentials objeto contendo { _id }
   * @returns Observable<IDataResponse | IResponseError> - Adjust response type if needed
   */
  public logoutService(credentials: { _id: string }): Observable<IDataResponse> {
    // Return IDataResponse on success
    const url = `${this.baseUrl}/logout`;
    return this.http.post<IDataResponse>(url, credentials).pipe(
      tap(() => this.removeToken()), // Remove token on logout
      catchError(this.handleError) // Use generic handler
    );
  }

  /**
   * Solicita a renovação do token.
   * @param id ID do usuário.
   * @returns Observable<ITokenResponse | IResponseError>
   */
  public refreshTokenService(id: string): Observable<ITokenResponse> {
    // Return ITokenResponse on success
    const url = `${this.baseUrl}/refresh-token`;
    return this.http.post<ITokenResponse>(url, { _id: id }).pipe(
      tap((response) => {
        // Store the new token on successful refresh
        if (response?.token) {
          this.storeToken(response.token);
        }
      }),
      catchError(this.handleError) // Use generic handler
    );
  }

  /**
   * Verifica se um token ainda é válido.
   * @param credentials objeto contendo { token }
   * @returns Observable<ITokenResponse | IResponseError>
   */
  public checkTokenService(credentials: { token: string }): Observable<ITokenResponse> {
    // Return ITokenResponse on success
    const url = `${this.baseUrl}/check-token`;
    return this.http.post<ITokenResponse>(url, credentials).pipe(
      // No specific mapping needed if backend returns { success: true/false }
      catchError(this.handleError) // Use generic handler
    );
  }

  /**
   * Redefine a senha usando o código de recuperação enviado por e-mail.
   * @param credentials objeto contendo { email, recoveryCode, newPassword }
   * @returns Observable<IDataResponse | IResponseError>
   */
  public resetPasswordService(credentials: IAuthParams): Observable<IDataResponse> {
    // Return IDataResponse on success
    const url = `${this.baseUrl}/reset-password`;
    return this.http.put<IDataResponse>(url, credentials).pipe(
      catchError(this.handleError) // Use generic handler
    );
  }

  /**
   * Solicita o envio de um código de recuperação de senha para o e-mail.
   * @param credentials objeto contendo { email }
   * @returns Observable<IDataResponse | IResponseError>
   */
  public passwordRecoveryService(credentials: { email: string }): Observable<IDataResponse> {
    // Return IDataResponse on success
    const url = `${this.baseUrl}/password-recovery`;
    return this.http.post<IDataResponse>(url, credentials).pipe(
      catchError(this.handleError) // Use generic handler
    );
  }

  // --- Token Management ---

  /** Stores the token in localStorage. */
  private storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /** Retrieves the token from localStorage. */
  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /** Removes the token from localStorage. */
  private removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /** Checks if a token exists. */
  public hasToken(): boolean {
    return !!this.getToken();
  }

  // --- Error Handling ---

  /**
   * Método genérico de tratamento de erro.
   * @param error erro recebido do HttpClient
   * @returns Observable<never> that throws IResponseError
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('AuthService Error:', error);
    // Handle 401 Unauthorized specifically (e.g., redirect to login)
    if (error.status === 401) {
      this.removeToken(); // Ensure token is removed
      this.router.navigate(['/signin']); // Redirect to login
    }
    const errorResponse: IResponseError = {
      success: false,
      message: error.error?.message || error.message || 'An unknown authentication error occurred',
    };
    return throwError(() => errorResponse);
  }
}
