import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser, IPaginatedResponse } from '../models/models.index'; // Ajuste o caminho se necessário
import { environment } from '../../../environments/environments'; // Importa as variáveis de ambiente

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiBaseUrl}/users`; // Usa a URL base da API definida nos environments

  constructor(private http: HttpClient) {}

  // READ: Obter todos os usuários (com paginação)
  getUsers(page: number = 1, limit: number = 10): Observable<IPaginatedResponse<IUser>> {
    return this.http
      .get<IPaginatedResponse<IUser>>(`${this.apiUrl}?page=${page}&limit=${limit}`)
      .pipe(catchError(this.handleError));
  }

  // READ: Obter um usuário pelo ID
  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // CREATE: Criar um novo usuário
  // Ajuste a interface de entrada conforme necessário (ex: Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>)
  createUser(userData: Partial<IUser>): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, userData).pipe(catchError(this.handleError));
  }

  // UPDATE: Atualizar um usuário existente
  updateUser(id: string, userData: Partial<IUser>): Observable<IUser> {
    return this.http
      .patch<IUser>(`${this.apiUrl}/${id}`, userData) // Ou PUT
      .pipe(catchError(this.handleError));
  }

  // DELETE: Deletar um usuário
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // Tratamento de erros genérico
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Ocorreu um erro na comunicação com a API. Tente novamente mais tarde.'));
  }
}
