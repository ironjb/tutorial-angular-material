import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Note } from '../../models/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  // --------- Inputs/Outputs

    @Input() notes: Note[];

  // ---------- Properties

    displayedColumns = ['position', 'title', 'date'];
    dataSource: MatTableDataSource<Note>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  // ---------- Constructor

    constructor() { }

  // ---------- Lifecycle Hooks

    ngOnInit() {
      this.dataSource = new MatTableDataSource<Note>(this.notes);
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  // ---------- Methods

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim();   // Remove whitespace
      filterValue = filterValue.toLowerCase();    // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
}
