import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IContentPage } from '../models/content-page.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentPageService {
  private baseUrl = `${environment.apiBaseUrl}/contentpage`; // Ajuste a rota

  constructor(private http: HttpClient) {}

  public getAllContentPages(): Observable<IContentPage[]> {
    return this.http.get<IContentPage[]>(this.baseUrl);
  }

  public getContentPage(id: string): Observable<IContentPage> {
    return this.http.get<IContentPage>(`${this.baseUrl}/${id}`);
  }

  public updateContentPage(id: string, data: Partial<IContentPage>): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  public deleteContentPage(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
