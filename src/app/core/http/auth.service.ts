import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { catchError, Observable, throwError } from 'rxjs';
import {
  IAuthParams,
  ICheckTokenParams,
  IRefreshToken,
  IResetPasswordParams,
  IResponseAuthRecoveryPassword,
  IResponseAuthRefreshToken,
  IResponseAuthResetPassword,
  IResponseAuthSignIn,
  IResponseAuthSignOut,
  IResponseAuthTokenValid,
} from '../models/models.auth';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environments';

export class AuthService {
  private readonly baseUrl = `${environment.apiBaseUrl}/auth`;

  constructor(
    private http: HttpClient,
  ) {}

  public loginService(credentials: IAuthParams): Observable<IResponseAuthSignIn> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<IResponseAuthSignIn>(url, credentials).pipe(catchError(this.handleError));
  }

  public logoutService(credentials: { _id: string }): Observable<IResponseAuthSignOut> {
    const url = `${this.baseUrl}/logout`;
    return this.http.post<IResponseAuthSignOut>(url, credentials).pipe(
      catchError(this.handleError)
    );
  }

  public refreshTokenService(credentials: IRefreshToken): Observable<IResponseAuthRefreshToken> {
    const url = `${this.baseUrl}/refresh-token`;
    return this.http.post<IResponseAuthRefreshToken>(url, credentials).pipe(
      catchError(this.handleError)
    );
  }

  public checkTokenService(credentials: ICheckTokenParams): Observable<IResponseAuthTokenValid> {
    const url = `${this.baseUrl}/check-token`;
    return this.http.post<IResponseAuthTokenValid>(url, credentials).pipe(catchError(this.handleError));
  }

  public passwordRecoveryService(credentials: IAuthParams): Observable<IResponseAuthResetPassword> {
    const url = `${this.baseUrl}/password-recovery`;
    return this.http.post<IResponseAuthResetPassword>(url, credentials).pipe(catchError(this.handleError));
  }

  public resetPasswordService(credentials: IResetPasswordParams): Observable<IResponseAuthRecoveryPassword> {
    const url = `${this.baseUrl}/reset-password`;
    return this.http.put<IResponseAuthRecoveryPassword>(url, credentials).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocorreu um erro no lado do cliente ou da rede:', error.error.message);
    } else {
      console.error(`Backend retornou código ${error.status}, corpo da resposta: `, error.error);
    }
    return throwError(() => new Error('Algo deu errado; por favor, tente novamente mais tarde.'));
  }
}
