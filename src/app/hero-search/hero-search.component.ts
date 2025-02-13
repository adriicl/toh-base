import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
  imports: [CommonModule],
})
export class HeroSearchComponent {
  searchQuery = signal<string>(''); // ✅ Estado reactivo

  @Output() search = new EventEmitter<string>(); // ✅ Emite la búsqueda al padre

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
    this.search.emit(this.searchQuery()); // ✅ Emitimos el valor actualizado
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.search.emit(''); // ✅ Emitimos vacío para reiniciar la búsqueda
  }
}
