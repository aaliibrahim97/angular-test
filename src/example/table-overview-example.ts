import { MatIconModule } from '@angular/material/icon';
import { AfterViewInit, Component, Inject, ViewChild, signal} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LIST_DATA } from './books';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';

//BOOK INTERFACE
export interface BookData {
  id: number;
  bookTitle: string;
  year: string;
  authorName: string;
  actions: boolean;
}

//LIST INTERFACE
export interface ListData {
  id: number;
  listTitle: string;
  actions: boolean;
  books: BookData[];
}

//LIST INTERFACE
export interface ListInject {
  list: {
    index: number;
  },
}

export interface ListPreviewInject {
  data: {
    books: BookData;
  },
}

//GLOBAL LIST
const list_array = signal(LIST_DATA);

//GLOBAL SUBJECT
const listArraySubject = new BehaviorSubject(list_array());

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-table-overview-example',
  styleUrls: ['table-overview-example.css'],
  templateUrl: 'table-overview-example.html',
  standalone: true,
  imports: [ MatTooltipModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, MatIconModule],
})

//ADD NEW LIST DIALOG
export class TableOverviewExampleComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'listTitle', 'actions'];
  dataSource: MatTableDataSource<ListData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog) {
    listArraySubject.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddList() {
    const dialogRef = this.dialog.open(AddListDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openPreviewList(books:BookData) {
    const dialogRef = this.dialog.open(ListPreviewDialogComponent,{
      data: {
        books
      },
      position: { right: '0', top: '0' },
      height: '100%',
      width: '70rem',
      hasBackdrop: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddBook(index:number) {
    const dialogRef = this.dialog.open(AddBookDialogComponent,{
      data: {
        index
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  removeList(index:number) {
    list_array.mutate((value)=> {
      value.splice(index, 1);
    })
    listArraySubject.next(list_array())
  }
}
@Component({
  selector: 'app-add-list',
  templateUrl: 'add-list.html',
  styleUrls: ['table-overview-example.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
})
//================================================

export class AddListDialogComponent {
 
  addNewList(f:NgForm) {
    const length = Number(list_array().length - 1)
    const newList = {
      id:list_array()[length].id + 1,
      listTitle:(<ListData>f.value).listTitle,
      books:[],
      actions:true
    }
    list_array.mutate((value) => value.push(newList));
    listArraySubject.next(list_array());
  }
}
//================================================

//LIST PREVIEW TABLE DIALOG
@Component({
  selector: 'app-list-preview',
  styleUrls: ['table-overview-example.css'],
  templateUrl: 'list-preview.html',
  standalone: true,
  imports: [ MatTooltipModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, MatIconModule],
})
export class ListPreviewDialogComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'bookTitle', 'year', 'authorName', 'actions'];
  dataSource: MatTableDataSource<BookData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataSource = new MatTableDataSource(data.books);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  removeBook(index:number) {
    this.data.books.splice(index, 1)
    this.dataSource = new MatTableDataSource(this.data.books);
  }

}
//================================================

//ADD BOOK DIALOG
@Component({
  selector: 'app-add-book',
  templateUrl: 'add-book.html',
  styleUrls: ['table-overview-example.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
})
export class AddBookDialogComponent {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  id!:number;

  addBook(f:NgForm) {
    
    let length = Number(list_array()[this.data.index].books.length)
    
    if(length > 0 ) {
      length = Number(length - 1)
      this.id = Number(list_array()[this.data.index].books[length].id + 1) 
    } 
    if(Number(list_array()[this.data.index].books.length == 0)) {
      this.id = 1
    }

    const newBook = {
      id:this.id,
      bookTitle: (<BookData>f.value).bookTitle,
      year: (<BookData>f.value).year,
      authorName: (<BookData>f.value).authorName,
      actions: true
    }
    list_array.mutate(value => {
      value[this.data.index].books.push(newBook)
    })
  }

}
//================================================

