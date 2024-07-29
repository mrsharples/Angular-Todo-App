import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ITodo } from '../../../../server/interfaces/ITodo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  baseUrl: string = 'http://localhost:8080';

  constructor(private apiService: ApiService) { }

  getTodos = (): Observable<{status: string, data: ITodo[]}> => {
    return this.apiService.get(`${this.baseUrl}/todos`, {
      responseType: 'json'
    });
  }

  createTodo = (
    newTodo: { task: string, dateDue: string}
  ): Observable<any> => {
    return this.apiService.post(`${this.baseUrl}/todos`, newTodo, {})
  }

  updateCompletedStatus = (todo: ITodo): Observable<any> => {
    return this.apiService.patch(`${this.baseUrl}/todos/${todo.id}`, todo, {})
  }

  deleteTodo = (todo: ITodo): Observable<any> => {
    return this.apiService.delete(`${this.baseUrl}/todos/${todo.id}`, {})
  }

}
