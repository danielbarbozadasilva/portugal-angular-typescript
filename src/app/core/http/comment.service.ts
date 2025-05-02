import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private apiUrl = '/api/comments';
  constructor(private http: HttpClient) {}
  getComments(activityId: string, params?: any): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/activity/${activityId}`, { params });
  }
  postComment(activityId: string, data: Partial<Comment>): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/activity/${activityId}`, data);
  }
}
