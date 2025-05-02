// src/app/dashboard/pages/activities/activities.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IActivity } from '../models/models.activity';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private baseUrl = 'http://localhost:3000/api/activities'; // Ajustar para sua API

  constructor(private http: HttpClient) {}

  // Buscar todas as atividades (poderíamos passar filtros, paginação etc.)
  getActivities(): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(this.baseUrl);
  }

  // Buscar atividade por ID
  getActivityById(id: string): Observable<IActivity> {
    return this.http.get<IActivity>(`${this.baseUrl}/${id}`);
  }

  // Criar nova atividade
  createActivity(data: Partial<IActivity>): Observable<IActivity> {
    return this.http.post<IActivity>(this.baseUrl, data);
  }

  // Atualizar atividade existente
  updateActivity(id: string, data: Partial<IActivity>): Observable<IActivity> {
    return this.http.put<IActivity>(`${this.baseUrl}/${id}`, data);
  }

  // Excluir atividade
  deleteActivity(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}
