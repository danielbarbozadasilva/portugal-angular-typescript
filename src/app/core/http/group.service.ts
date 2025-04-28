import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse
import { IGroup, IResponse, IResponseError } from '../models/models.index'; // Import IResponse, IResponseError
import { Observable, throwError } from 'rxjs'; // Import throwError
import { catchError, map } from 'rxjs/operators'; // Import catchError, map
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private baseUrl = `${environment.apiBaseUrl}/groups`;

  constructor(private http: HttpClient) {}

  public getAllGroups(): Observable<IGroup[]> {
    return this.http.get<IResponse<IGroup[]>>(this.baseUrl).pipe(
      // Expect IResponse
      map((response) => response.data), // Extract data
      catchError(this.handleError) // Add error handling
    );
  }

  public getGroup(id: string): Observable<IGroup> {
    return this.http.get<IResponse<IGroup>>(`${this.baseUrl}/${id}`).pipe(
      // Expect IResponse
      map((response) => response.data), // Extract data
      catchError(this.handleError) // Add error handling
    );
  }

  // Create group (assuming this might be needed)
  public createGroup(group: Partial<IGroup>): Observable<IGroup> {
    return this.http.post<IResponse<IGroup>>(this.baseUrl, group).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  public updateGroup(id: string, data: Partial<IGroup>): Observable<IGroup> {
    // Return updated group
    return this.http.put<IResponse<IGroup>>(`${this.baseUrl}/${id}`, data).pipe(
      // Expect IResponse
      map((response) => response.data), // Extract data
      catchError(this.handleError) // Add error handling
    );
  }

  public deleteGroup(id: string): Observable<{ id: string }> {
    // Return id object
    return this.http.delete<IResponse<any>>(`${this.baseUrl}/${id}`).pipe(
      // Expect IResponse
      map(() => ({ id })), // Map to id object on success
      catchError(this.handleError) // Add error handling
    );
  }

  // Generic error handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('GroupService Error:', error);
    const errorResponse: IResponseError = {
      success: false,
      message: error.error?.message || error.message || 'An unknown error occurred',
    };
    return throwError(() => errorResponse);
  }
}
