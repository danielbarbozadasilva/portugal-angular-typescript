import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environments';
import { IResponse, IResponseError } from '../models/models.index'; // Assumindo que IAvailabilitySlot será adicionado a models.index
import { IAvailabilitySlot } from '../models/availability.model'; // Criar este modelo

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  private baseUrl = `${environment.apiBaseUrl}/availability`;

  constructor(private http: HttpClient) {}

  // Verificar disponibilidade para uma atividade em uma data específica
  checkAvailability(activityId: string, date: string, participants: number): Observable<IAvailabilitySlot[]> {
    const params = new HttpParams()
      .set('activityId', activityId)
      .set('date', date)
      .set('participants', participants.toString());
    return this.http.get<IResponse<IAvailabilitySlot[]>>(this.baseUrl, { params }).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Obter todos os slots de disponibilidade para uma atividade (pode precisar de paginação/filtros)
  getAvailabilitySlots(activityId: string, startDate?: string, endDate?: string): Observable<IAvailabilitySlot[]> {
    let params = new HttpParams().set('activityId', activityId);
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this.http.get<IResponse<IAvailabilitySlot[]>>(`${this.baseUrl}/slots`, { params }).pipe(
      // Endpoint exemplo: /availability/slots
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Métodos para CRUD de slots (se gerenciados pelo front-end/admin)
  // createAvailabilitySlot(...)
  // updateAvailabilitySlot(...)
  // deleteAvailabilitySlot(...)

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('AvailabilityService Error:', error);
    const errorResponse: IResponseError = {
      success: false,
      message: error.error?.message || error.message || 'An unknown error occurred while checking availability.',
    };
    return throwError(() => errorResponse);
  }
}

// Definição básica - Mover para models/availability.model.ts e models/models.index.ts
export interface IAvailabilitySlot {
  id: string;
  activityId: string;
  date: string; // Ou Date
  time?: string; // Ou Date
  availableSpots: number;
  totalSpots: number;
  price?: number; // Preço pode variar por slot
}
