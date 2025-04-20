import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../models/order.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = `${environment.apiBaseUrl}/orders`; // Ajuste conforme rota

  constructor(private http: HttpClient) {}

  public getAllOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.baseUrl);
  }

  public getOrder(id: string): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.baseUrl}/${id}`);
  }

  public updateOrder(id: string, data: Partial<IOrder>): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  public deleteOrder(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
