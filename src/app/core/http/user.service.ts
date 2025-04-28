import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUser, IResponse, IResponseError } from '../models/models.index'; // Import necessary interfaces
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.apiBaseUrl}/users`; // Correct base URL

  constructor(private http: HttpClient) {}

  // Get all users
  public getAllUsers(): Observable<IUser[]> {
    return this.http.get<IResponse<IUser[]>>(this.baseUrl).pipe(
      map((response) => response.data), // Assuming API returns { data: [...] }
      catchError(this.handleError)
    );
  }

  // Get user by ID
  public getUserById(id: string): Observable<IUser> {
    return this.http.get<IResponse<IUser>>(`${this.baseUrl}/${id}`).pipe(
      map((response) => response.data), // Assuming API returns { data: {...} }
      catchError(this.handleError)
    );
  }

  // Update user
  public updateUser(id: string, data: Partial<IUser>): Observable<IUser> {
    return this.http.put<IResponse<IUser>>(`${this.baseUrl}/${id}`, data).pipe(
      map((response) => response.data), // Assuming API returns updated user in data
      catchError(this.handleError)
    );
  }

  // Remove user
  public removeUser(id: string): Observable<{ id: string }> {
    // Return object with id for effect
    return this.http.delete<IResponse<any>>(`${this.baseUrl}/${id}`).pipe(
      map(() => ({ id })), // Return the id on success
      catchError(this.handleError)
    );
  }

  // Generic error handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('UserService Error:', error);
    const errorResponse: IResponseError = {
      success: false,
      message: error.error?.message || error.message || 'An unknown error occurred',
    };
    return throwError(() => errorResponse);
  }
}
