/**
 * @file activity.service.ts
 * @description Serviço Angular responsável por fazer requisições HTTP à API de atividades.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IActivity } from '../models/models.activity';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private baseUrl = `${environment.apiBaseUrl}/activity`;

  constructor(private http: HttpClient) { }

  /**
   * Busca todas as atividades com possíveis filtros.
   * @param filters Objeto com filtros opcionais (keyword, category, minPrice, etc).
   */
  public getAllActivities(filters?: any): Observable<IActivity[]> {
    let params = new HttpParams();

    // Monta query params a partir dos filtros
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key] !== null && filters[key] !== undefined) {
          params = params.set(key, filters[key]);
        }
      });
    }

    return this.http.get<IActivity[]>(this.baseUrl, { params });
  }

  /**
   * Busca uma única atividade pelo ID.
   * @param id string
   */
  public getActivity(id: string): Observable<IActivity> {
    return this.http.get<IActivity>(`${this.baseUrl}/${id}`);
  }

  /**
   * Cria uma atividade.
   * @param activity Objeto parcial (pois pode não conter todos os campos) de IActivity
   */
  public createActivity(activity: Partial<IActivity>): Observable<any> {
    return this.http.post<any>(this.baseUrl, activity);
  }

  /**
   * Atualiza uma atividade existente pelo ID.
   * @param id string
   * @param data Objeto parcial de IActivity
   */
  public updateActivity(id: string, data: Partial<IActivity>): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  /**
   * Deleta uma atividade.
   * @param id string
   */
  public deleteActivity(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
