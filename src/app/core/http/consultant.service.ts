import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConsultantService {
  private apiUrl = '/api/consultants';
  constructor(private http: HttpClient) {}
  getConsultants(params?: any): Observable<any[]> { // Corrected the return type to Observable<any[]>
    return this.http.get<any[]>(this.apiUrl, { params });
  }
  getConsultantById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  createConsultant(data: Partial<any>): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
  updateConsultant(id: string, data: Partial<any>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }
  deleteConsultant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
