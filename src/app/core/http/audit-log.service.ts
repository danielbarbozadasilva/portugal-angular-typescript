import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IAuditLog, IResponseError } from '../models/models.index';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuditLogService {
  private baseUrl = `${environment.apiBaseUrl}/auditlogs`;

  constructor(private http: HttpClient) {}

  public getAllAuditLogs(): Observable<IAuditLog[]> {
    return this.http.get<IResponse<IAuditLog[]>>(this.baseUrl).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  public getAuditLog(id: string): Observable<IAuditLog> {
    return this.http.get<IResponse<IAuditLog>>(`${this.baseUrl}/${id}`).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Add createAuditLog if needed
  // public createAuditLog(log: Partial<IAuditLog>): Observable<IAuditLog> { ... }

  // Generic error handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('AuditLogService Error:', error);
    const errorResponse: IResponseError = {
      success: false,
      message: error.error?.message || error.message || 'An unknown error occurred',
    };
    return throwError(() => errorResponse);
  }
}
