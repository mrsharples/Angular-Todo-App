import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFinishedTodo } from '../../../../../../../server/interfaces/interfaces';


@Component({
  selector: 'app-archive-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archive-table.component.html',
  styleUrl: './archive-table.component.css'
})
export class ArchiveTableComponent {

  @Input() archive: IFinishedTodo[] = [];
  @Output() deleted = new EventEmitter<IFinishedTodo>();


  deleteTodoFromArchive(todo: IFinishedTodo) {
    this.deleted.emit(todo);
  }

}
