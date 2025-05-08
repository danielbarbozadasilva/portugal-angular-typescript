import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IOrder, IResponse, IResponseError, IPaginatedResponse } from '../models/models.index';
import { environment } from '../../../environments/environments';

export interface PaginatedOrdersResponse extends IPaginatedResponse<IOrder> {}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.apiBaseUrl}/orders`;
  private profileApiUrl = `${environment.apiBaseUrl}/profile/orders`;

  constructor(private http: HttpClient) {}

  public getAllOrders(params?: HttpParams): Observable<PaginatedOrdersResponse> {
    return this.http.get<IResponse<PaginatedOrdersResponse>>(this.apiUrl, { params }).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  public getOrderById(id: string): Observable<IOrder> {
    return this.http.get<IResponse<IOrder>>(`${this.apiUrl}/${id}`).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  public createOrder(data: Partial<IOrder>): Observable<IOrder> {
    return this.http.post<IResponse<IOrder>>(this.apiUrl, data).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  public updateOrder(id: string, data: Partial<IOrder>): Observable<IOrder> {
    return this.http.put<IResponse<IOrder>>(`${this.apiUrl}/${id}`, data).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  public removeOrder(id: string): Observable<{ id: string }> {
    return this.http.delete<IResponse<null>>(`${this.apiUrl}/${id}`).pipe(
      map(() => ({ id })), // Retorna o ID para o effect
      catchError(this.handleError)
    );
  }

  public getMyOrders(page: number = 1, limit: number = 10): Observable<PaginatedOrdersResponse> {
    const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.http.get<IResponse<PaginatedOrdersResponse>>(this.profileApiUrl, { params }).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  public getMyOrderById(orderId: string): Observable<IOrder> {
    return this.http.get<IResponse<IOrder>>(`${this.profileApiUrl}/${orderId}`).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('OrderService Error:', error);
    const errorResponse: IResponseError = {
      success: false,
      message: error.error?.message || error.message || 'An unknown error occurred in OrderService',
      error: error.error,
    };
    return throwError(() => errorResponse);
  }
}
