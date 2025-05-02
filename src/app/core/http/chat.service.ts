import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private apiUrl = '/api/chat';
  constructor(private http: HttpClient) {}
  getMessages(conversationId: string): Observable<MessageChannel  []> {
    return this.http.get<MessageChannel[]>(`${this.apiUrl}/${conversationId}`);
  }
  sendMessage(conversationId: string, data: Partial<MessageChannel>): Observable<MessageChannel> {
    return this.http.post<MessageChannel>(`${this.apiUrl}/${conversationId}`, data);
  }
}
