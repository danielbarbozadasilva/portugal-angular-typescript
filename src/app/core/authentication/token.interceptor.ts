import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../http/auth.service';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { refreshTokenSuccess, refreshTokenFailure } from '../store/auth/auth.actions';
import { selectAuthToken, selectAuthUser } from '../store/auth/auth.selectors';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private token: string | null = null;
  private userId: string;

  constructor(
    private store: Store,
    private authService: AuthService
  ) {
    // Sempre que o token mudar no Store, atualiza localmente
    this.store.select(selectAuthToken).subscribe((tk) => {
      this.token = tk;
    });
    this.store.select(selectAuthUser).subscribe((user) => {
      this.userId = user;
    });
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Clona a requisição com token, se existir
    let authReq = req;
    if (this.token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Tenta "refresh token"
          return this.authService.refreshTokenService(this.userId).pipe(
            switchMap((newToken: any) => {
              // Dispara a action no store
              this.store.dispatch(refreshTokenSuccess({ newToken }));
              // Clona novamente com o novo token
              const newAuthReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
              });
              // Retenta a requisição original
              return next.handle(newAuthReq);
            }),
            catchError((refreshError) => {
              // Se falhou, dispatch da falha
              this.store.dispatch(refreshTokenFailure({ error: refreshError }));
              // Propaga o erro
              return throwError(() => refreshError);
            })
          );
        }
        // Se não for 401, apenas propaga
        return throwError(() => error);
      })
    );
  }
}
