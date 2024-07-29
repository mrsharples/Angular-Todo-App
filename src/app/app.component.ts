import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoTableComponent } from './todo-table/todo-table.component';
import { ITodo } from './../../../server/interfaces/ITodo';
import { TodosService } from './services/todos.service';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoTableComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private todosService: TodosService
  ) {}

  allTodos: ITodo[] = [];
  newTodoTask = '';
  newTodoDate = '';

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

  deleteTodo(event: ITodo) {
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

  ngOnInit() {
    this.fetchTodos();
  }
}
