import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPayment } from '../models/payment.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = `${environment.apiBaseUrl}/payments`;

  constructor(private http: HttpClient) {}

  public getAllPayments(): Observable<IPayment[]> {
    return this.http.get<IPayment[]>(this.baseUrl);
  }

  public getPayment(id: string): Observable<IPayment> {
    return this.http.get<IPayment>(`${this.baseUrl}/${id}`);
  }

  public updatePayment(id: string, data: Partial<IPayment>): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  public deletePayment(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
