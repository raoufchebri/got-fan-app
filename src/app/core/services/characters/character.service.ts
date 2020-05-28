import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../../models/character.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }
  getByFilter(gender?: string, culture?: string, isAlive?: boolean, page?: number): Observable<Character[]> {
    console.log(`page ${page}`);
    
    const URL = `https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=10`;
    return this.http.get<Character[]>(URL);
  }
}
