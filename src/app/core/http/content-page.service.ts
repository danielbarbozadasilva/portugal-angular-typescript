import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IContentPage, IResponse, IResponseError } from '../models/models.index';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ContentPageService {
  private baseUrl = `${environment.apiBaseUrl}/contentpage`;

  constructor(private http: HttpClient) {}

  public getAllContentPages(): Observable<IContentPage[]> {
    return this.http.get<IResponse<IContentPage[]>>(this.baseUrl).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  public getContentPage(id: string): Observable<IContentPage> {
    return this.http.get<IResponse<IContentPage>>(`${this.baseUrl}/${id}`).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  // Create content page (assuming this might be needed)
  public createContentPage(page: Partial<IContentPage>): Observable<IContentPage> {
    return this.http.post<IResponse<IContentPage>>(this.baseUrl, page).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  public updateContentPage(id: string, data: Partial<IContentPage>): Observable<IContentPage> {
    // Return updated page
    return this.http.put<IResponse<IContentPage>>(`${this.baseUrl}/${id}`, data).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  public deleteContentPage(id: string): Observable<{ id: string }> {
    // Return id object
    return this.http.delete<IResponse<any>>(`${this.baseUrl}/${id}`).pipe(
      map(() => ({ id })), // Map to id object on success
      catchError(this.handleError)
    );
  }

  // Generic error handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('ContentPageService Error:', error);
    const errorResponse: IResponseError = {
      success: false,
      message: error.error?.message || error.message || 'An unknown error occurred',
    };
    return throwError(() => errorResponse);
  }
}
