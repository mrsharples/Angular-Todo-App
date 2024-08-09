import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IHttpResponse, ITodo } from '../../../../server/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  baseUrl: string = 'http://localhost:8080';

  constructor(private apiService: ApiService) { }

  getTodos = (): Observable<IHttpResponse> => {
    return this.apiService.get(`${this.baseUrl}/todos`, {
      responseType: 'json'
    });
  }

  createTodo = (
    newTodo: { task: string, dateDue: string}
  ): Observable<IHttpResponse> => {
    return this.apiService.post(`${this.baseUrl}/todos`, newTodo, {})
  }

  updateCompletedStatus = (todo: ITodo): Observable<IHttpResponse> => {
    return this.apiService.patch(`${this.baseUrl}/todos/${todo.id}`, todo, {})
  }

  deleteTodo = (id: number): Observable<IHttpResponse> => {
    return this.apiService.delete(`${this.baseUrl}/todos/${id}`, {})
  }

}
