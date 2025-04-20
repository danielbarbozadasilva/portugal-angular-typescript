import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAuditLog } from '../models/models.auditLog';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {
  private baseUrl = `${environment.apiBaseUrl}/auditlogs`; // Ajuste conforme suas rotas

  constructor(private http: HttpClient) {}

  public getAllAuditLogs(): Observable<IAuditLog[]> {
    return this.http.get<IAuditLog[]>(this.baseUrl);
  }

  public getAuditLog(id: string): Observable<IAuditLog> {
    return this.http.get<IAuditLog>(`${this.baseUrl}/${id}`);
  }
}
