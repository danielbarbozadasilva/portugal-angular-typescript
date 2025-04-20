import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAgent } from '../models/agent.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private baseUrl = `${environment.apiBaseUrl}/agents`;

  constructor(private http: HttpClient) {}

  public getAllAgents(): Observable<IAgent[]> {
    return this.http.get<IAgent[]>(this.baseUrl);
  }

  public getAgent(id: string): Observable<IAgent> {
    return this.http.get<IAgent>(`${this.baseUrl}/${id}`);
  }

  public createAgent(agent: Partial<IAgent>): Observable<any> {
    return this.http.post<any>(this.baseUrl, agent);
  }

  public updateAgent(id: string, data: Partial<IAgent>): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  public deleteAgent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
