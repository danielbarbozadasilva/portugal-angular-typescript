import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IClient, IResponse, IResponseError } from '../models/models.index';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = `${environment.apiBaseUrl}/clients`;

  constructor(private http: HttpClient) {}

  public getAllClients(): Observable<IClient[]> {
    return this.http.get<IResponse<IClient[]>>(this.baseUrl).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  public getClient(id: string): Observable<IClient> {
    return this.http.get<IResponse<IClient>>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  public createClient(client: Partial<IClient>): Observable<IClient> {
    return this.http.post<IResponse<IClient>>(this.baseUrl, client).pipe(
      map((res) => res.data),
      catchError(this.handleError)
    );
  }

  public updateClient(id: string, data: Partial<IClient>): Observable<IClient> {
    return this.http.put<IResponse<IClient>>(`${this.baseUrl}/${id}`, data).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  public deleteClient(id: string): Observable<{ id: string }> {
    return this.http.delete<IResponse<any>>(`${this.baseUrl}/${id}`).pipe(
      map(() => ({ id })),
      catchError(this.handleError)
    );
  }

  // Generic error handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('ClientService Error:', error);
    const errorResponse: IResponseError = {
      success: false,
      message: error.error?.message || error.message || 'An unknown error occurred'
    };
    return throwError(() => errorResponse);
  }
}
