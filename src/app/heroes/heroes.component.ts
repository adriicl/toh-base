import { Component, OnInit, inject, signal } from '@angular/core';
import { MarvelService } from '../services/marvel.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Hero } from '../hero.interface';

@Component({
  selector: 'app-heroes',
  standalone: true,
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class HeroesComponent implements OnInit {
  characters = signal<Hero[]>([]);
  private marvelService = inject(MarvelService);
  private limit = 20; // Se paginará la lista con 20 personajes por página
  currentPage = signal<number>(1);

  constructor() {}

  ngOnInit(): void {
    this.fetchCharacters();
  }

  fetchCharacters(): void {
    const offset = (this.currentPage() - 1) * this.limit;
    this.marvelService.getCharacters(undefined, offset, this.limit).subscribe((response: Hero[]) => {
      this.characters.set(response);
    });
  }  

  nextPage(): void {
    this.currentPage.set(this.currentPage() + 1);
    this.fetchCharacters();
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      this.fetchCharacters();
    }
  }
}
