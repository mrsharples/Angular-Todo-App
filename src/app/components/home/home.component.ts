import { Component, OnInit } from '@angular/core';
import { TodoTableComponent } from './todo-table/todo-table.component';
import { ITodo } from '../../../../../server/interfaces/interfaces';
import { TodosService } from './../../services/todos.service';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArchiveService } from '../../services/archive.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TodoTableComponent, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
}) 
export class HomeComponent implements OnInit {
  title = 'app';

  constructor(
    private todosService: TodosService,
    private archiveService: ArchiveService
  ) {}

  allTodos: ITodo[] = [];
  newTodoTask = '';
  newTodoDate = '';
  showForm = false;

  fetchTodos() {
    this.todosService.getTodos()
      .pipe(
        map(response => response.data),
        map(data => {
          data.sort(function(a: ITodo, b: ITodo) { 
            const date1 = new Date(a.dateDue).valueOf()
            const date2 = new Date(b.dateDue).valueOf()
            return date1 - date2;
          })
          return data;
          }
        )
      )
      .subscribe(
          data => this.allTodos = data
      );
  }

  createNewTodo() {
    const todoPayload = {
      task: this.newTodoTask,
      dateDue: this.newTodoDate,
    }

    this.todosService.createTodo(todoPayload)
    .pipe(
      map(response => {
        console.log(response.message)
      })
    )
    .subscribe(
      () => {
        this.fetchTodos();
        this.newTodoTask = '';
        this.newTodoDate = '';
        this.showForm = false;
      }
    )
  }

  updateTodo(event: ITodo) {
    this.todosService.updateCompletedStatus(event)
    .subscribe(
      result => console.log(result.message)
    )
  }

  archiveTodo({ id, task, createdAt, dateDue } : ITodo ) {
    const payload = {
      task,
      dateCreated: createdAt.toLocaleString(),
      dateDue: dateDue.toLocaleString()
    }
    this.archiveService.createTodo(payload)
    .subscribe(
      result => console.log(result.message)
    )

    this.todosService.deleteTodo(id)
    .subscribe(
      () => this.fetchTodos()
    )
    
  }

  handleFormClose() {
    this.showForm = false;
  }

  ngOnInit() {
    this.fetchTodos();
  }
}
