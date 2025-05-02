import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultant } from '../models/consultant.model';

@Injectable({ providedIn: 'root' })
export class ConsultantService {
  private apiUrl = '/api/consultants';
  constructor(private http: HttpClient) {}
  getConsultants(params?: any): Observable<Consultant[]> {
    return this.http.get<Consultant[]>(this.apiUrl, { params });
  }
  getConsultantById(id: string): Observable<Consultant> {
    return this.http.get<Consultant>(`${this.apiUrl}/${id}`);
  }
  createConsultant(data: Partial<Consultant>): Observable<Consultant> {
    return this.http.post<Consultant>(this.apiUrl, data);
  }
  updateConsultant(id: string, data: Partial<Consultant>): Observable<Consultant> {
    return this.http.put<Consultant>(`${this.apiUrl}/${id}`, data);
  }
  deleteConsultant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
