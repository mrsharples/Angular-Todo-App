import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../../../../../../server/interfaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({ 
  selector: 'app-todo-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-table.component.html',
  styleUrl: './todo-table.component.css'
})
export class TodoTableComponent {

  @Input() todos: ITodo[] = [];
  @Output() changed = new EventEmitter<ITodo>();
  @Output() archived = new EventEmitter<ITodo>();

  isOverdue(dateDue: Date) {
    let todaysDate = new Date();
    todaysDate.setHours(0,0,0,0);
    let formattedDateDue = new Date(dateDue);

    return formattedDateDue < todaysDate;
  }
  
  toggleCompletedStatus(todo: ITodo) {
    todo.done = !todo.done;
    this.changed.emit(todo);
  }

  deleteTodo(todo: ITodo) {
    this.archived.emit(todo);
  }

}
