import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IActivity } from '../models/models.activity';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private baseUrl = `${environment.apiBaseUrl}/activity`;

  constructor(private http: HttpClient) {}

  public getAllActivities(): Observable<IActivity[]> {
    return this.http.get<IActivity[]>(this.baseUrl);
  }

  public getActivity(id: string): Observable<IActivity> {
    return this.http.get<IActivity>(`${this.baseUrl}/${id}`);
  }

  public createActivity(activity: Partial<IActivity>): Observable<any> {
    return this.http.post<any>(this.baseUrl, activity);
  }

  public updateActivity(id: string, data: Partial<IActivity>): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  public deleteActivity(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
