import { Component, OnInit } from '@angular/core';
import { ArchiveTableComponent } from "./archive-table/archive-table.component";
import { ArchiveService } from '../../../services/archive.service';
import { map } from 'rxjs';
import { IFinishedTodo } from '../../../../../../server/interfaces/interfaces';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [ArchiveTableComponent],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.css'
})
export class ArchiveComponent implements OnInit {

  archivedTodos: IFinishedTodo[] = [];

  constructor(
    private archiveService: ArchiveService
  ) { }

  fetchTodos() {
    this.archiveService.getTodos()
      .pipe(
        map(response => response.data)
      )
      .subscribe(
        {
          next: (data: IFinishedTodo[]) => {
            data.sort(function(a, b) { 
              const date1 = new Date(a.dateCreated).valueOf()
              const date2 = new Date(b.dateCreated).valueOf()
              return date1 - date2;
            })
            this.archivedTodos = data;
            console.log(this.archivedTodos);
          },
          error: (err) => {
            console.log(err)
          }
        }
      );
  }

  deleteTodo(event: IFinishedTodo) {
    this.archiveService.deleteTodo(event)
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
