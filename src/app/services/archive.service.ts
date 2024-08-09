import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IFinishedTodo, IHttpResponse } from '../../../../server/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  baseUrl: string = 'http://localhost:8080';

  constructor(private apiService: ApiService) { }

  getTodos = (): Observable<IHttpResponse> => {
    return this.apiService.get(`${this.baseUrl}/archive`, {
      responseType: 'json'
    });
  }

  createTodo = (
    newTodo: { task: string, dateCreated: string, dateDue: string}
  ): Observable<IHttpResponse> => {
    return this.apiService.post(`${this.baseUrl}/archive`, newTodo, {})
  }

  deleteTodo = (id: number): Observable<IHttpResponse> => {
    return this.apiService.delete(`${this.baseUrl}/archive/${id}`, {})
  }

}
