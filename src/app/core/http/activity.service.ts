import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IActivity } from '../models/models.activity';
import { environment } from 'environments/environments';
@Injectable({ providedIn: 'root' })
export class ActivityService {
  private apiUrl = `${environment.apiBaseUrl}/activities`;

  constructor(private http: HttpClient) {}
  getActivities(params?: any): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(this.apiUrl, { params });
  }
  getActivityById(id: string): Observable<IActivity> {
    return this.http.get<IActivity>(`${this.apiUrl}/${id}`);
  }
  createActivity(data: Partial<IActivity>): Observable<IActivity> {
    return this.http.post<IActivity>(this.apiUrl, data);
  }
  updateActivity(id: string, data: Partial<IActivity>): Observable<IActivity> {
    return this.http.put<IActivity>(`${this.apiUrl}/${id}`, data);
  }
  deleteActivity(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  uploadImages(id: string, files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));
    return this.http.post(`${this.apiUrl}/${id}/images`, formData);
  }
}
