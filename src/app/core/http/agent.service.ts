import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IAgent, IAgentData } from '../models/models.agent';
import { environment } from '../../../environments/environments';
import { IPaginatedResponse } from '../models/models.user';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private apiUrl = `${environment.apiBaseUrl}/agents`;

  constructor(private http: HttpClient) {}

  public getAgents(page: number = 1, limit: number = 10, filters?: any): Observable<IPaginatedResponse<IAgent>> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          params = params.set(key, filters[key]);
        }
      });
    }
    return this.http.get<IPaginatedResponse<IAgent>>(this.apiUrl, { params });
  }

  // GET: Buscar um agente pelo ID
  public getAgentById(id: string): Observable<IAgent> {
    return this.http.get<IAgent>(`${this.apiUrl}/${id}`);
  }

  // POST: Criar um novo agente
  public createAgent(agentData: IAgentData): Observable<IAgent> {
    // Removendo campos que não devem ser enviados na criação (ex: _id, createdAt, etc.)
    // A interface IAgentRequest já deve refletir os campos necessários para criação
    return this.http.post<IAgent>(this.apiUrl, agentData);
  }

  // PUT: Atualizar um agente existente
  public updateAgent(id: string, agentData: Partial<IAgentData>): Observable<IAgent> {
    // A interface Partial<IAgentRequest> permite atualizações parciais
    return this.http.put<IAgent>(`${this.apiUrl}/${id}`, agentData);
  }

  public deleteAgent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
