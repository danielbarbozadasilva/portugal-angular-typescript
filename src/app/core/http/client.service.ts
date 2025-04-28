import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SignUpData, Client } from '../store/client/client.actions';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) {}

  // Realiza requisição de cadastro de novo cliente
  signUp(data: SignUpData): Observable<Client> {
    return this.http.post<Client>('/api/clients', data).pipe(
      // Padroniza o erro em caso de falha na API
      catchError(err => {
        let errorMsg = 'Erro ao cadastrar cliente. Por favor, tente novamente.';
        // Se a resposta de erro possuir uma mensagem, utiliza-a
        if (err.error && err.error.message) {
          errorMsg = err.error.message;
        }
        // Retorna um erro com mensagem padronizada (será capturado no effect NGRX)
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
