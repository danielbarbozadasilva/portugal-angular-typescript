import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private apiUrl = '/api/comments';
  constructor(private http: HttpClient) {}
  getComments(activityId: string, params?: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/activity/${activityId}`, { params });
  }
  postComment(activityId: string, data: Partial<any>): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/activity/${activityId}`, data);
  }
  deleteComment(commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${commentId}`);
  }
  getCommentById(commentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${commentId}`);
  }

  updateComment(commentId: string, data: Partial<any>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${commentId}`, data);
  }
}
