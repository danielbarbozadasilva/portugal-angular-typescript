import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISolicitationCartItem } from '../models/models.solicitationCartItem';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SolicitationCartService {
  private baseUrl = `${environment.apiBaseUrl}/solicitationCartItem`;

  constructor(private http: HttpClient) {}

  public getAllSolicitationsCartItem(): Observable<ISolicitationCartItem[]> {
    return this.http.get<ISolicitationCartItem[]>(this.baseUrl);
  }

  public getSolicitationCartItem(id: string): Observable<ISolicitationCartItem> {
    return this.http.get<ISolicitationCartItem>(`${this.baseUrl}/${id}`);
  }

  public updateSolicitationCartItem(
    id: string,
    data: Partial<ISolicitationCartItem>
  ): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  public deleteSolicitationCartItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
