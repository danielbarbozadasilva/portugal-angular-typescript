import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IActivity, IActivityFilters, IResponse, IResponseError } from '../models/models.index';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private baseUrl = `${environment.apiBaseUrl}/activity`;

  constructor(private http: HttpClient) {}

  /**
   * Busca todas as atividades com possíveis filtros e paginação.
   * @param filters Objeto com filtros opcionais (keyword, category, minPrice, etc) e paginação (page, limit).
   */
  public getAllActivities(filters?: IActivityFilters & { page?: number; limit?: number }): Observable<IActivity[]> {
    let params = new HttpParams();

    // Monta query params a partir dos filtros
    if (filters) {
      Object.keys(filters).forEach((key) => {
        const filterKey = key as keyof typeof filters;
        if (filters[filterKey] !== null && filters[filterKey] !== undefined && filters[filterKey] !== '') {
          params = params.set(key, String(filters[filterKey]));
        }
      });
    }

    // Assuming API returns { data: [...], total: ..., page: ..., limit: ... }
    // Adjust map if API structure is different
    return this.http.get<IResponse<IActivity[]>>(this.baseUrl, { params }).pipe(
      // TODO: If pagination metadata (total, page, limit) is needed in the store,
      // the effect should handle the full IResponse, not just IActivity[]
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  /**
   * Busca uma única atividade pelo ID.
   * @param id string
   */
  public getActivity(id: string): Observable<IActivity> {
    return this.http.get<IResponse<IActivity>>(`${this.baseUrl}/${id}`).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  /**
   * Cria uma atividade.
   * @param activity Objeto parcial (pois pode não conter todos os campos) de IActivity
   */
  public createActivity(activity: Partial<IActivity>): Observable<IActivity> {
    return this.http.post<IResponse<IActivity>>(this.baseUrl, activity).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  /**
   * Atualiza uma atividade existente pelo ID.
   * @param id string
   * @param data Objeto parcial de IActivity
   */
  public updateActivity(id: string, data: Partial<IActivity>): Observable<IActivity> {
    return this.http.put<IResponse<IActivity>>(`${this.baseUrl}/${id}`, data).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  /**
   * Deleta uma atividade.
   * @param id string
   */
  public deleteActivity(id: string): Observable<{ id: string }> {
    return this.http.delete<IResponse<any>>(`${this.baseUrl}/${id}`).pipe(
      map(() => ({ id })),
      catchError(this.handleError)
    );
  }

  // Generic error handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('ActivityService Error:', error);
    const errorResponse: IResponseError = {
      success: false,
      message: error.error?.message || error.message || 'An unknown error occurred',
    };
    return throwError(() => errorResponse);
  }
}
