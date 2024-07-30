import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IFinishedTodo } from '../../../../server/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  baseUrl: string = 'http://localhost:8080';

  constructor(private apiService: ApiService) { }

  getTodos = (): Observable<{status: string, data: IFinishedTodo[]}> => {
    return this.apiService.get(`${this.baseUrl}/archive`, {
      responseType: 'json'
    });
  }

  createTodo = (
    newTodo: { task: string, dateCreated: string, dateDue: string}
  ): Observable<any> => {
    return this.apiService.post(`${this.baseUrl}/archive`, newTodo, {})
  }

  deleteTodo = (todo: IFinishedTodo): Observable<any> => {
    return this.apiService.delete(`${this.baseUrl}/archive/${todo.id}`, {})
  }

}
