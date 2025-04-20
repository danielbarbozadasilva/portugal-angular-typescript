import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPaymentMethod } from '../models/models.paymentMethod';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  private baseUrl = `${environment.apiBaseUrl}/paymentmethod`;

  constructor(private http: HttpClient) {}

  public getAllPaymentMethods(): Observable<IPaymentMethod[]> {
    return this.http.get<IPaymentMethod[]>(this.baseUrl);
  }

  public getPaymentMethod(id: string): Observable<IPaymentMethod> {
    return this.http.get<IPaymentMethod>(`${this.baseUrl}/${id}`);
  }

  public updatePaymentMethod(id: string, data: Partial<IPaymentMethod>): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  public deletePaymentMethod(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
