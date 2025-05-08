import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ISolicitation, IResponse, IResponseError } from '../models/models.index';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class SolicitationService {
  private baseUrl = `${environment.apiBaseUrl}/solicitations`; // Adjust endpoint if needed

  constructor(private http: HttpClient) {}

  // Get all solicitations
  public getAllSolicitations(): Observable<ISolicitation[]> {
    return this.http.get<IResponse<ISolicitation[]>>(this.baseUrl).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Get solicitation by ID
  public getSolicitationById(id: string): Observable<ISolicitation> {
    return this.http.get<IResponse<ISolicitation>>(`${this.baseUrl}/${id}`).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Update solicitation
  public updateSolicitation(id: string, data: Partial<ISolicitation>): Observable<ISolicitation> {
    return this.http.put<IResponse<ISolicitation>>(`${this.baseUrl}/${id}`, data).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Remove solicitation
  public removeSolicitation(id: string): Observable<{ id: string }> {
    return this.http.delete<IResponse<any>>(`${this.baseUrl}/${id}`).pipe(
      map(() => ({ id })),
      catchError(this.handleError)
    );
  }

  // Generic error handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('SolicitationService Error:', error);
    const errorResponse: IResponseError = {
      success: false,
      message: error.error?.message || error.message || 'An unknown error occurred',
    };
    return throwError(() => errorResponse);
  }
}
