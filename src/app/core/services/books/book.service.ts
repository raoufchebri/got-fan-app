import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../models/book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }
  getByFilter(fromReleaseDate: Date, toReleaseDate?: Date): Observable<Book[]> {
    const URL = `https://www.anapioficeandfire.com/api/books?fromReleaseDate=${fromReleaseDate.toISOString().substring(0, 10)}&toReleaseDate=${toReleaseDate.toISOString().substring(0, 10)}`;
    return this.http.get<Book[]>(URL);
  }
  getById(id: number) {
    const URL = `https://www.anapioficeandfire.com/api/books/${id}`;
    return this.http.get<Book[]>(URL);
  }

  get() {
    const URL = `https://www.anapioficeandfire.com/api/books`;
    return this.http.get<Book[]>(URL);
  }
}
