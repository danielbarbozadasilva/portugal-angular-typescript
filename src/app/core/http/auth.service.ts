/**
 * auth.service.ts
 *
 * Serviço Angular responsável pelas operações de autenticação (login, logout, refresh token, etc.)
 * Substitui o antigo "http from '../config/http'" por HttpClient, retornando Observables.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAuthParams, IAuthResponse, IDataResponse, IResponseError, ITokenResponse } from './types/types.auth';
import { Observable, catchError, throwError, map } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) {}

  /**
   * Realiza login com e-mail e senha.
   * @param credentials objeto contendo { email, password }
   * @returns Observable<IAuthResponse | IResponseError>
   */
  public loginService(credentials: { email: string; password: string }): Observable<IAuthResponse | IResponseError> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<IAuthResponse>(url, credentials).pipe(
      map(response => response),
      catchError(error => this.handleError(error, 'Erro no login'))
    );
  }

  /**
   * Realiza logout para o usuário
   * @param credentials objeto contendo { _id }
   */
  public logoutService(credentials: { _id: string }): Observable<IAuthResponse | IResponseError> {
    const url = `${this.baseUrl}/logout`;
    return this.http.post<IAuthResponse | IResponseError>(url, credentials).pipe(
      map(response => response),
      catchError(error => this.handleError(error, 'Erro ao efetuar logout'))
    );
  }

  /**
   * Solicita a renovação do token
   * @param credentials objeto contendo { _id }
   */
  public refreshTokenService(credentials: { _id: string }): Observable<ITokenResponse | IResponseError> {
    const url = `${this.baseUrl}/refresh-token`;
    return this.http.post<ITokenResponse>(url, credentials).pipe(
      map(response => response),
      catchError(error => this.handleError(error, 'Erro ao renovar token'))
    );
  }

  /**
   * Verifica se um token ainda é válido
   * @param credentials objeto contendo { token }
   */
  public checkTokenService(credentials: { token: string }): Observable<ITokenResponse | IResponseError> {
    const url = `${this.baseUrl}/check-token`;
    return this.http.post<ITokenResponse>(url, credentials).pipe(
      map(response => {
        // Caso você queira retornar apenas success: boolean
        // com base no backend, podemos mapear explicitamente:
        return { success: response.success } as IResponseError;
      }),
      catchError(error => this.handleError(error, 'Token inválido'))
    );
  }

  /**
   * Redefine a senha usando o código de recuperação enviado por e-mail
   * @param credentials objeto contendo { email, recoveryCode, newPassword }
   */
  public resetPasswordService(credentials: IAuthParams): Observable<IDataResponse | IResponseError> {
    const url = `${this.baseUrl}/reset-password`;
    return this.http.put<IDataResponse | IResponseError>(url, credentials).pipe(
      map(response => response),
      catchError(error => this.handleError(error, 'Erro ao redefinir senha'))
    );
  }

  /**
   * Solicita o envio de um código de recuperação de senha para o e-mail
   * @param credentials objeto contendo { email }
   */
  public passwordRecoveryService(credentials: { email: string }): Observable<IDataResponse | IResponseError> {
    const url = `${this.baseUrl}/password-recovery`;
    return this.http.post<IDataResponse | IResponseError>(url, credentials).pipe(
      map(response => response),
      catchError(error => this.handleError(error, 'Erro ao solicitar recuperação de senha'))
    );
  }

  /**
   * Método genérico de tratamento de erro, para manter consistência
   * @param error erro recebido do HttpClient
   * @param customMessage mensagem de fallback
   */
  private handleError(error: HttpErrorResponse, customMessage: string): Observable<IResponseError> {
    const msg = error?.error?.message || customMessage || 'Erro desconhecido';
    // Você pode também disparar um toast/alert aqui, se preferir
    return throwError(() => ({ success: false, message: msg } as IResponseError));
  }
}
