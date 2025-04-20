import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISolicitation } from '../models/models.solicitation';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SolicitationService {
  private baseUrl = `${environment.apiBaseUrl}/solicitation`; // Ajuste a rota

  constructor(private http: HttpClient) {}

  public getAllSolicitations(): Observable<ISolicitation[]> {
    return this.http.get<ISolicitation[]>(this.baseUrl);
  }

  public getSolicitation(id: string): Observable<ISolicitation> {
    return this.http.get<ISolicitation>(`${this.baseUrl}/${id}`);
  }

  public updateSolicitation(
    id: string,
    data: Partial<ISolicitation>
  ): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  public deleteSolicitation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
