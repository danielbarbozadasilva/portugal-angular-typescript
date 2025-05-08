import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IClient, IPaginatedResponse } from '../models/models.index';
import { environment } from '../../../environments/environments';

type IClientCreate = Omit<IClient, '_id' | 'createdAt' | 'updatedAt' | 'deleted'>;

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = `${environment.apiBaseUrl}/clients`;

  constructor(private http: HttpClient) {}

  getClients(page: number = 1, limit: number = 10): Observable<IPaginatedResponse<IClient>> {
    return this.http
      .get<IPaginatedResponse<IClient>>(`${this.apiUrl}?page=${page}&limit=${limit}`)
      .pipe(catchError(this.handleError));
  }

  getClientById(id: string): Observable<IClient> {
    return this.http.get<IClient>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  createClient(clientData: IClientCreate): Observable<IClient> {
    return this.http.post<IClient>(this.apiUrl, clientData).pipe(catchError(this.handleError));
  }

  updateClient(id: string, clientData: Partial<IClient>): Observable<IClient> {
    const { _id, createdAt, updatedAt, deleted, user, ...updateData } = clientData;
    return this.http.patch<IClient>(`${this.apiUrl}/${id}`, updateData).pipe(catchError(this.handleError));
  }

  deleteClient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Ocorreu um erro na comunicação com a API. Tente novamente mais tarde.'));
  }
}
