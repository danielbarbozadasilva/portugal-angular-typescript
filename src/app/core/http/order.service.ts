import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IOrder, IResponse, IResponseError } from '../models/models.index';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = `${environment.apiBaseUrl}/orders`; // Adjust endpoint if needed

  constructor(private http: HttpClient) {}

  // Get all orders
  public getAllOrders(): Observable<IOrder[]> {
    return this.http.get<IResponse<IOrder[]>>(this.baseUrl).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Get order by ID
  public getOrderById(id: string): Observable<IOrder> {
    return this.http.get<IResponse<IOrder>>(`${this.baseUrl}/${id}`).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Create order (assuming this might be needed)
  public createOrder(order: Partial<IOrder>): Observable<IOrder> {
    return this.http.post<IResponse<IOrder>>(this.baseUrl, order).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Update order
  public updateOrder(id: string, data: Partial<IOrder>): Observable<IOrder> {
    return this.http.put<IResponse<IOrder>>(`${this.baseUrl}/${id}`, data).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Remove order
  public removeOrder(id: string): Observable<{ id: string }> {
    return this.http.delete<IResponse<any>>(`${this.baseUrl}/${id}`).pipe(
      map(() => ({ id })),
      catchError(this.handleError)
    );
  }

  // Generic error handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('OrderService Error:', error);
    const errorResponse: IResponseError = {
      success: false,
      message: error.error?.message || error.message || 'An unknown error occurred',
    };
    return throwError(() => errorResponse);
  }
}
