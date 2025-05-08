import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IPayment, IResponse, IResponseError, IPaginatedResponse } from '../models/models.index';
import { environment } from '../../../environments/environments';

export interface PaginatedPaymentsResponse extends IPaginatedResponse<IPayment> {}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private baseUrl = `${environment.apiBaseUrl}/payments`;

  constructor(private http: HttpClient) {}

  public getAllPayments(params?: HttpParams): Observable<PaginatedPaymentsResponse> {
    return this.http.get<IResponse<PaginatedPaymentsResponse>>(this.baseUrl, { params }).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  public getPaymentById(id: string): Observable<IPayment> {
    return this.http.get<IResponse<IPayment>>(`${this.baseUrl}/${id}`).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  public createPayment(data: Partial<IPayment>): Observable<IPayment> {
    return this.http.post<IResponse<IPayment>>(this.baseUrl, data).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  public updatePayment(id: string, data: Partial<IPayment>): Observable<IPayment> {
    return this.http.put<IResponse<IPayment>>(`${this.baseUrl}/${id}`, data).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  public deletePayment(id: string): Observable<{ id: string }> {
    return this.http.delete<IResponse<null>>(`${this.baseUrl}/${id}`).pipe(
      map(() => ({ id })), // Retorna o ID para o effect
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('PaymentService Error:', error);
    const errorResponse: IResponseError = {
      success: false,
      message: error.error?.message || error.message || 'An unknown error occurred in PaymentService',
      error: error.error,
    };
    return throwError(() => errorResponse);
  }
}
