import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRating } from '../models/models.rating';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private baseUrl = `${environment.apiBaseUrl}/rating`;

  constructor(private http: HttpClient) {}

  public getRating(id: string): Observable<IRating> {
    return this.http.get<IRating>(`${this.baseUrl}/${id}`);
  }

  public createRating(data: IRating): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  public updateRating(id: string, data: Partial<IRating>): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  public deleteRating(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
