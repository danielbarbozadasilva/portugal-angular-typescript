import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environments';
import { IResponse, IResponseError } from '../models/models.index'; 
import { ICartItem } from '../../core/models/models.cartItem';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = `${environment.apiBaseUrl}/cart`; 

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) {}

  // Obter carrinho (supondo que retorna array de itens)
  getCart(): Observable<ICartItem[]> {
    return this.http.get<IResponse<ICartItem[]>>(this.baseUrl).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Adicionar item ao carrinho
  addItem(itemData: Partial<ICartItem>): Observable<ICartItem[]> {
    return this.http.post<IResponse<ICartItem[]>>(this.baseUrl, itemData).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Atualizar item
  updateItem(itemId: string, quantity: number): Observable<ICartItem[]> {
    return this.http.put<IResponse<ICartItem[]>>(`${this.baseUrl}/items/${itemId}`, { quantity }).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Remover item do carrinho
  removeItem(itemId: string): Observable<ICartItem[]> {
    return this.http.delete<IResponse<ICartItem[]>>(`${this.baseUrl}/items/${itemId}`).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Limpar carrinho
  clearCart(): Observable<ICartItem[]> {
    return this.http.delete<IResponse<ICartItem[]>>(this.baseUrl).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Exemplo de checkout
  checkout(checkoutData: any): Observable<any> {
    return this.http.post<IResponse<any>>(`${this.baseUrl}/checkout`, checkoutData).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('CartService Error:', error);

    const defaultErrorMessage = this.translate.instant('cart.errorUnknown');

    const errorResponse: IResponseError = {
      success: false,
      message: error.error?.message || error.message || defaultErrorMessage,
    };
    return throwError(() => errorResponse);
  }
}
