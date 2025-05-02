import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environments';
import { IResponse, IResponseError } from '../models/models.index';
import { IGroup, IGroupMembership } from '../models/group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private baseUrl = `${environment.apiBaseUrl}/groups`;

  constructor(private http: HttpClient) {}

  getAllGroups(): Observable<IGroup[]> {
    return this.http.get<IResponse<IGroup[]>>(this.baseUrl).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  getGroupById(id: string): Observable<IGroup> {
    return this.http.get<IResponse<IGroup>>(`${this.baseUrl}/${id}`).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  createGroup(groupData: Partial<IGroup>): Observable<IGroup> {
    return this.http.post<IResponse<IGroup>>(this.baseUrl, groupData).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  updateGroup(id: string, groupData: Partial<IGroup>): Observable<IGroup> {
    return this.http.put<IResponse<IGroup>>(`${this.baseUrl}/${id}`, groupData).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  deleteGroup(id: string): Observable<{ id: string }> {
    return this.http.delete<IResponse<any>>(`${this.baseUrl}/${id}`).pipe(
      map(() => ({ id })),
      catchError(this.handleError)
    );
  }

  addMember(groupId: string, userId: string): Observable<IGroupMembership> {
    return this.http.post<IResponse<IGroupMembership>>(`${this.baseUrl}/${groupId}/members`, { userId }).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  removeMember(groupId: string, userId: string): Observable<void> {
    return this.http.delete<IResponse<void>>(`${this.baseUrl}/${groupId}/members/${userId}`).pipe(
      map(() => undefined),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('GroupService Error:', error);
    const errorResponse: IResponseError = {
      success: false,
      message: error.error?.message || error.message || 'An unknown error occurred while managing groups.',
    };
    return throwError(() => errorResponse);
  }
}
