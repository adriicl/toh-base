import { Injectable } from '@angular/core';
import { Hero } from './hero.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private url = 'http://localhost:3000';

  private heroes: Hero[] = [
    {
      id: 1,
      name: "Batman"
    }, 
    {
      id: 2,
      name: "Capi"
    }, 
    {
      id: 3,
      name: "SuperPablo"
    },
     {
      id: 4,
      name: "MegaJorge"
    }, 
    {
      id: 5,
      name: "CamiloMan"
    }, 
    {
      id: 6,
      name: "Timurnator"
    }, 
    {
      id: 7,
      name: "Green Arrow"
    }, 
    {
      id: 8,
      name: "Blue Spoon"
    }, 
    {
      id: 9,
      name: "Red richars"
    }, 
    {
      id: 10,
      name: "Errejón"
    },
  ];

  constructor(
    private http: HttpClient
  ) { }


  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.url}/heroes`);

  }

  public getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.url}/heroes/${id}`);
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.url}/?name=${term}`);
  }
}
