import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IActivity } from '../models/models.activity';
import { environment } from 'environments/environments';

@Injectable({
  providedIn: 'root',
})

export class ActivitiesService {
  private baseUrl = `${environment.apiBaseUrl}/activity`;

  constructor(private http: HttpClient) {}

  public getActivities(): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(this.baseUrl);
  }

  public getActivitiesDashboard(page: number, limit: number, keyword?: string, category?: string, sort?: string): Observable<IActivity[]> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (keyword) params = params.set('keyword', keyword);
    if (category) params = params.set('category', category);
    if (sort) params = params.set('sort', sort);
    return this.http.get<IActivity[]>(this.baseUrl, { params });
  }

  public getActivityById(id: string): Observable<IActivity> {
    return this.http.get<IActivity>(`${this.baseUrl}/${id}`);
  }

  public createActivityWithImages(formData: FormData): Observable<IActivity> {
    return this.http.post<IActivity>(this.baseUrl, formData);
  }

  public updateActivityWithImages(id: string, formData: IActivity): Observable<IActivity> {
    return this.http.put<IActivity>(`${this.baseUrl}/${id}`, formData);
  }

  public deleteActivity(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}
