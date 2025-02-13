import { Component, OnInit, inject, signal } from '@angular/core';
import { MarvelService } from '../services/marvel.service';
import { CommonModule } from '@angular/common';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { RouterModule } from '@angular/router';
import { Hero } from '../hero.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, HeroSearchComponent, RouterModule],
})
export class DashboardComponent implements OnInit {
  characters = signal<Hero[]>([]);
  currentPage = signal<number>(1);
  private marvelService = inject(MarvelService);
  private totalCharacters = 1500; // 🔹 Cantidad aproximada de personajes en la API

  constructor() {}

  ngOnInit(): void {
    this.fetchCharacters(); // 🔹 Cargar personajes aleatorios al inicio
  }

  fetchCharacters(name?: string): void {
    let page = this.currentPage();

    // 🔹 Generar una página aleatoria solo si NO hay búsqueda activa
    if (!name) {
      const randomPage = Math.floor(Math.random() * (this.totalCharacters / 20)) + 1;
      page = randomPage;
    }

    this.marvelService.getCharacters(name, page).subscribe((response) => {
      this.characters.set(response);
    });
  }

  onSearchHero(name: string): void {
    this.currentPage.set(1); // 🔹 Reiniciar búsqueda en la página 1
    this.fetchCharacters(name);
  }
}
