import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IClient } from '../models/models.client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = `${environment.apiBaseUrl}/clients`;

  constructor(private http: HttpClient) {}

  public getAllClients(): Observable<IClient[]> {
    return this.http.get<IClient[]>(this.baseUrl);
  }

  public getClient(id: string): Observable<IClient> {
    return this.http.get<IClient>(`${this.baseUrl}/${id}`);
  }

  public createClient(client: Partial<IClient>): Observable<any> {
    return this.http.post<any>(this.baseUrl, client);
  }

  public updateClient(id: string, data: Partial<IClient>): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  public deleteClient(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
