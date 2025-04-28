import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse
import { Observable, throwError } from 'rxjs'; // Import throwError
import { IAgent, IResponse, IResponseError } from '../models/models.index'; // Import IResponseError
import { environment } from '../../../environments/environments';
import { catchError, map } from 'rxjs/operators'; // Import catchError, map

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private baseUrl = `${environment.apiBaseUrl}/agents`; // Corrected base URL

  constructor(private http: HttpClient) {}

  public getAllAgents(): Observable<IAgent[]> {
    return this.http.get<IResponse<IAgent[]>>(this.baseUrl).pipe(
      // Expect IResponse
      map((response) => response.data), // Extract data
      catchError(this.handleError) // Add error handling
    );
  }

  public getAgent(id: string): Observable<IAgent> {
    return this.http.get<IResponse<IAgent>>(`${this.baseUrl}/${id}`).pipe(
      // Expect IResponse
      map((response) => response.data), // Extract data
      catchError(this.handleError) // Add error handling
    );
  }

  public createAgent(agent: IAgent): Observable<IAgent> {
    // Return created IAgent
    // Determine Content-Type based on whether file upload is actually needed
    // If no file upload, use 'application/json'
    // For now, assuming JSON is sufficient unless a file field exists in ISignUpAgent
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let body: any = agent;

    // Example check if a file field exists (adjust field name like 'profilePictureFile')
    // if (agent.profilePictureFile instanceof File) {
    //   headers = new HttpHeaders(); // Let browser set Content-Type for FormData
    //   const formData = new FormData();
    //   Object.keys(agent).forEach((key) => {
    //     const value = (agent as any)[key];
    //     if (value !== undefined && value !== null) {
    //       formData.append(key, value);
    //     }
    //   });
    //   body = formData;
    // }

    return this.http
      .post<IResponse<IAgent>>(this.baseUrl, body, { headers }) // Use corrected URL, expect IResponse<IAgent>
      .pipe(
        map((response) => response.data), // Extract created agent data
        catchError(this.handleError) // Use generic handler
      );
  }

  public updateAgent(id: string, data: Partial<IAgent>): Observable<IAgent> {
    // Return updated IAgent
    // Similar logic for Content-Type if update involves files
    return this.http.put<IResponse<IAgent>>(`${this.baseUrl}/${id}`, data).pipe(
      // Expect IResponse<IAgent>
      map((response) => response.data), // Extract updated agent data
      catchError(this.handleError) // Add error handling
    );
  }

  public deleteAgent(id: string): Observable<{ id: string }> {
    // Return id object
    return this.http.delete<IResponse<any>>(`${this.baseUrl}/${id}`).pipe(
      // Expect IResponse
      map(() => ({ id })), // Map to id object on success
      catchError(this.handleError) // Add error handling
    );
  }

  // Generic error handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('AgentService Error:', error);
    const errorResponse: IResponseError = {
      success: false,
      message: error.error?.message || error.message || 'An unknown error occurred',
    };
    return throwError(() => errorResponse);
  }
}
