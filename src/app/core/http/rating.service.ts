import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environments';
import { IResponse, IResponseError, IRating } from '../models/models.index';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private baseUrl = `${environment.apiBaseUrl}/ratings`;

  constructor(private http: HttpClient) {}

  // Obter avaliações (ex: por atividade)
  getRatings(activityId: string): Observable<IRating[]> {
    const params = new HttpParams().set('activityId', activityId);
    return this.http.get<IResponse<IRating[]>>(this.baseUrl, { params }).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Criar uma nova avaliação
  createRating(ratingData: Partial<IRating>): Observable<IRating> {
    return this.http.post<IResponse<IRating>>(this.baseUrl, ratingData).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Atualizar uma avaliação (se aplicável)
  updateRating(id: string, ratingData: Partial<IRating>): Observable<IRating> {
    return this.http.put<IResponse<IRating>>(`${this.baseUrl}/${id}`, ratingData).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Excluir uma avaliação (se aplicável)
  deleteRating(id: string): Observable<{ id: string }> {
    return this.http.delete<IResponse<any>>(`${this.baseUrl}/${id}`).pipe(
      map(() => ({ id })),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('RatingService Error:', error);
    const errorResponse: IResponseError = {
      success: false,
      message: error.error?.message || error.message || 'An unknown error occurred while managing ratings.',
    };
    return throwError(() => errorResponse);
  }
}

// Definição básica - Mover para models/rating.model.ts e models/models.index.ts
export interface IRating {
  id: string;
  activityId: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}
