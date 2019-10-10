import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

import { allBooks, allReaders } from 'app/data';
import { Reader } from 'app/models/reader';
import { Book } from 'app/models/book';
import { BookTrackerError } from 'app/models/bookTrackerError';

@Injectable()
export class DataService {
  mostPopularBook: Book = allBooks[0];

  constructor(
    private http: HttpClient
  ) { }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Observable<Reader[]> {
    return this.http.get<Reader[]>('/api/readers')
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('/api/books');
  }

  getReaderById(id: number): Observable<Reader> {
    return this.http.get<Reader>(`/api/readers/${id}`);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`/api/books/${id}`);
  }

  addReader(newReader: Reader): Observable<Reader> {
    return this.http.post<Reader>('/api/readers', newReader, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>('/api/books', newBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  updateReader(updatedReader: Reader): Observable<void> {
    return this.http.put<void>(`/api/readers/${updatedReader.readerID}`, updatedReader, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  updatedBook(updatedBook: Book): Observable<void> {
    return this.http.put<void>(`/api/books/${updatedBook.bookID}`, updatedBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  deleteReader(readerId: number): Observable<void> {
    return this.http.delete<void>(`/api/readers/${readerId}`);
  }

  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`/api/books/${bookId}`);
  }
}
