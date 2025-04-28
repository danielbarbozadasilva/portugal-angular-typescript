import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ISolicitationCartItem, IResponse, IResponseError } from '../models/models.index';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class SolicitationCartService {
  // Renamed service to match filename convention
  private baseUrl = `${environment.apiBaseUrl}/solicitation-cart-items`; // Adjust endpoint

  constructor(private http: HttpClient) {}

  // Get all cart items (potentially filtered by user/cart ID if needed)
  public getAllSolicitationCartItems(): Observable<ISolicitationCartItem[]> {
    // Add query params if filtering is required, e.g., { params: { userId: '...' } }
    return this.http.get<IResponse<ISolicitationCartItem[]>>(this.baseUrl).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Get cart item by ID
  public getSolicitationCartItemById(id: string): Observable<ISolicitationCartItem> {
    return this.http.get<IResponse<ISolicitationCartItem>>(`${this.baseUrl}/${id}`).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Create cart item (assuming this might be needed)
  public createSolicitationCartItem(item: Partial<ISolicitationCartItem>): Observable<ISolicitationCartItem> {
    return this.http.post<IResponse<ISolicitationCartItem>>(this.baseUrl, item).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Update cart item
  public updateSolicitationCartItem(
    id: string,
    data: Partial<ISolicitationCartItem>
  ): Observable<ISolicitationCartItem> {
    return this.http.put<IResponse<ISolicitationCartItem>>(`${this.baseUrl}/${id}`, data).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Remove cart item
  public removeSolicitationCartItem(id: string): Observable<{ id: string }> {
    return this.http.delete<IResponse<any>>(`${this.baseUrl}/${id}`).pipe(
      map(() => ({ id })),
      catchError(this.handleError)
    );
  }

  // Generic error handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('SolicitationCartService Error:', error);
    const errorResponse: IResponseError = {
      success: false,
      message: error.error?.message || error.message || 'An unknown error occurred',
    };
    return throwError(() => errorResponse);
  }
}
