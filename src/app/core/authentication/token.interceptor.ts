import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectToken } from '../store/auth/auth.selectors';
import { of } from 'rxjs';
import { refreshToken } from '../store/auth/auth.actions';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private token: string | null = null;

  constructor(private store: Store) {
    // Escuta mudanças no token via NgRx
    this.store.select(selectToken).subscribe(token => {
      this.token = token;
    });
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    let authReq = request;
    if (this.token) {
      authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Exemplo de como poderíamos tentar renovar token
          return this.store.dispatch(refreshToken({ userId: '' })) as any;
        }
        return throwError(() => error);
      })
    );
  }
}
