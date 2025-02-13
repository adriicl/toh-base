import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelService } from '../services/marvel.service';
import { CommonModule } from '@angular/common';
import { Hero } from '../hero.interface';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
  imports: [CommonModule],
})
export class HeroDetailComponent implements OnInit {
  character = signal<Hero | null>(null);
  private marvelService = inject(MarvelService);
  private route = inject(ActivatedRoute);

  constructor() {}

  ngOnInit(): void {
    const characterId = Number(this.route.snapshot.paramMap.get('id')); // Obtener el ID de la URL

    if (characterId) {
      this.fetchCharacter(characterId);
    }
  }

  fetchCharacter(id: number): void {
    this.marvelService.getCharacterById(id).subscribe((response) => {
      if (response.data.results.length > 0) {
        this.character.set(response.data.results[0] as Hero); // ✅ Especificamos que es un `Hero`
      }
    });
  }  
}
