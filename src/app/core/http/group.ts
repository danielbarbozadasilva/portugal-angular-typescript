import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IGroup } from '../models/group.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private baseUrl = `${environment.apiBaseUrl}/groups`; // Ajuste a rota

  constructor(private http: HttpClient) {}

  public getAllGroups(): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(this.baseUrl);
  }

  public getGroup(id: string): Observable<IGroup> {
    return this.http.get<IGroup>(`${this.baseUrl}/${id}`);
  }

  public updateGroup(id: string, data: Partial<IGroup>): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  public deleteGroup(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
