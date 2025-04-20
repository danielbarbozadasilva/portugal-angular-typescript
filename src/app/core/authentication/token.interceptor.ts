import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { refreshTokenSuccess, refreshTokenFailure } from '../store/auth/auth.actions';
import { selectToken, selectCurrentUser } from '../store/auth/auth.selectors';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private token: string | null = null;
  private userId: string | null = null;
  constructor(
    private store: Store,
    private authService: AuthService
  ) {
    // Sempre que o token mudar no Store, atualiza localmente
    this.store.select(selectToken).subscribe(tk => {
      this.token = tk;
    });
    this.store.select(selectCurrentUser).subscribe(tk => {
      this.userId = tk;
    });
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Clona a requisição com token, se existir
    let authReq = req;
    if (this.token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Exemplo de "refresh token" prático:
          // 1) Chama um método do AuthService que retorna Observable<string> (o novo token)
          return this.authService.refreshToken(this.userId).pipe(
            switchMap((newToken: string) => {
              // Dispara a action no store (opcional)
              this.store.dispatch(refreshTokenSuccess({ newToken }));
              // Clona a requisição novamente com o novo token
              const newAuthReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });
              // Reenvia a requisição original com o token renovado
              return next.handle(newAuthReq);
            }),
            catchError((refreshError) => {
              // Se der falha no refresh, podemos dispatch de logout ou algo do tipo
              this.store.dispatch(refreshTokenFailure({ error: refreshError }));
              // Propaga o erro original
              return throwError(() => refreshError);
            })
          );
        }
        // Se não for 401, apenas propaga o erro
        return throwError(() => error);
      })
    );
  }
}
