import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from '../hero.interface';

@Injectable({
  providedIn: 'root',
})
export class MarvelService {
  private http = inject(HttpClient);

  private baseUrl = 'https://gateway.marvel.com/v1/public/characters';
  private ts = '45fb37800244f82087a8a665d1c5cbd3';
  private apikey = '45fb37800244f82087a8a665d1c5cbd3';
  private hash = '1f206d84d8c8eaea2f5a0334faa7e4cf';
  private limit = 10;
  private totalCharacters = 1500;

  getCharacters(name?: string, offset: number = 0, limit: number = 20): Observable<Hero[]> {
    let url = `${this.baseUrl}?ts=${this.ts}&apikey=${this.apikey}&hash=${this.hash}&limit=${limit}&offset=${offset}`;
  
    if (name) {
      url += `&nameStartsWith=${encodeURIComponent(name)}`;
    }
  
    return this.http.get<{ data: { results: Hero[] } }>(url).pipe(
      map(response => response.data.results)
    );
  }

  getCharacterById(id: number): Observable<{ data: { results: Hero[] } }> {
    const url = `${this.baseUrl}/${id}?ts=${this.ts}&apikey=${this.apikey}&hash=${this.hash}`;
    return this.http.get<{ data: { results: Hero[] } }>(url);
  }  
  
}  
