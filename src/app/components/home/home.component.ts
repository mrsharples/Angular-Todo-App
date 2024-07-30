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
        map(response => response.data)
      )
      .subscribe(
        {
          next: (data: ITodo[]) => {
            data.sort(function(a, b) { 
              const date1 = new Date(a.dateDue).valueOf()
              const date2 = new Date(b.dateDue).valueOf()
              return date1 - date2;
            })
            this.allTodos = data;
            console.log(this.allTodos);
          },
          error: (err) => {
            console.log(err)
          }
        }
      );
  }

  createNewTodo() {
    const todoPayload = {
      task: this.newTodoTask,
      dateDue: this.newTodoDate,
    }

    this.todosService.createTodo(todoPayload)
      .subscribe({
        next: (result) => {
          this.fetchTodos();
          console.log(result)
          this.newTodoTask = '';
          this.newTodoDate = '';
          this.showForm = false;
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

  updateTodo(event: ITodo) {
    this.todosService.updateCompletedStatus(event)
    .pipe(
      map(response => {
        console.log(response.data)
        return response.message
      })
    )
    .subscribe({
      next: result => {
        console.log(result)
      }
    })
  }

  archiveTodo(event: ITodo) {
    const payload = {
      task: event.task,
      dateCreated: event.createdAt.toLocaleString(),
      dateDue: event.dateDue.toLocaleString()
    }
    console.log(payload)
    this.archiveService.createTodo(payload)
    .pipe(
      map(response => response.message)
    )
    .subscribe({
      next: result => {
        console.log(result);
      }
    })

    this.todosService.deleteTodo(event)
    .pipe(
      map(response => response.message)
    )
    .subscribe({
      next: result => {
        console.log(result);
        this.fetchTodos();
      }
    })
    
  }

  handleFormClose() {
    this.showForm = false;
  }

  ngOnInit() {
    this.fetchTodos();
  }
}
