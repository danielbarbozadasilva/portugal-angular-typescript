import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environments';
import { IConsultant } from '../models/models.consultant'; // Importa a interface
import { IPaginatedResponse } from '../models/models.user'; // Assume paginação similar a outros serviços

@Injectable({ providedIn: 'root' })
export class ConsultantService {
  private apiUrl = `${environment.apiBaseUrl}/consultants`; // Usa a URL base da API

  constructor(private http: HttpClient) {}

  // GET: Obter consultores com paginação e filtros (opcional)
  getConsultants(page: number = 1, limit: number = 10, filters?: any): Observable<IPaginatedResponse<IConsultant>> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          params = params.set(key, filters[key]);
        }
      });
    }
    return this.http.get<IPaginatedResponse<IConsultant>>(this.apiUrl, { params }).pipe(catchError(this.handleError));
  }

  // GET: Obter um consultor pelo ID
  getConsultantById(id: string): Observable<IConsultant> {
    return this.http.get<IConsultant>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // POST: Criar um novo consultor
  createConsultant(data: Partial<Omit<IConsultant, '_id'>>): Observable<IConsultant> {
    return this.http.post<IConsultant>(this.apiUrl, data).pipe(catchError(this.handleError));
  }

  // PUT: Atualizar um consultor existente
  updateConsultant(id: string, data: Partial<Omit<IConsultant, '_id'>>): Observable<IConsultant> {
    return this.http.put<IConsultant>(`${this.apiUrl}/${id}`, data).pipe(catchError(this.handleError));
  }

  // DELETE: Deletar um consultor
  deleteConsultant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // Tratamento de erros genérico
  private handleError(error: HttpErrorResponse) {
    console.error('ConsultantService Error:', error);
    let errorMessage = 'Ocorreu um erro desconhecido ao gerenciar consultores.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro do cliente: ${error.error.message}`;
    } else if (error.status) {
      errorMessage = `Erro ${error.status}: ${error.error?.message || error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
