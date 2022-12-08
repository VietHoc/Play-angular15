import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from './book-list/book-list.model';
import { BooksActions, BooksApiActions } from './book-list/books.actions';
import { GoogleBooksService } from './book-list/books.services';
import { selectBookCollection, selectBooks } from './state/books.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular15';

  public count$: Observable<number>;

  public books$ = this.store.select(selectBooks);
  public bookCollection$ = this.store.select(selectBookCollection);

  constructor(
    private store: Store<{count: number}>,
    private booksService: GoogleBooksService
  ) {
    this.count$ = store.select('count');
  }

  ngOnInit() {
    this.booksService
      .getBooks()
      .subscribe((books: ReadonlyArray<Book> | []) =>
        this.store.dispatch(BooksApiActions.retrievedBookList({ books }))
      );
  }

  public onAdd(bookId: string) {
    this.store.dispatch(BooksActions.addBook({ bookId }));
  }
 
  public onRemove(bookId: string) {
    this.store.dispatch(BooksActions.removeBook({ bookId }));
  }
}
