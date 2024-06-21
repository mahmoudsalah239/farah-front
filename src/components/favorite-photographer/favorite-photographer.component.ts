import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-photographer.component.html',
  styleUrls: ['./favorite-photographer.component.scss']
})
export class FavoritePhotographerComponent implements OnInit {

  favoritePhotographers: any[] = [];
  photographers = [
    { id: 1, name: 'مصور 1', imageUrl: 'https://st3.depositphotos.com/12985790/16650/i/1600/depositphotos_166506298-stock-photo-male-photographer-with-digital-camera.jpg', price: 3000, description: 'الوصف', city: 'القاهرة', town: 'القاهرة' },
    { id: 2, name: 'مصور 2', imageUrl: 'https://st2.depositphotos.com/3662505/5821/i/950/depositphotos_58212791-stock-photo-tourists.jpg', price: 4000, description: 'الوصف', city: 'الإسكندرية', town: 'الإسكندرية' },
    { id: 3, name: 'مصور 3', imageUrl: 'https://previews.123rf.com/images/cc0collection/cc0collection2205/cc0collection220540765/186116451-people-man-photographer-photography-canon-camera-lens-kit-dslr-picture-photo.jpg', price: 5000, description: 'الوصف', city: 'الجيزة', town: 'الجيزة' },
    { id: 4, name: 'مصور 4', imageUrl: 'https://previews.123rf.com/images/stockbroker/stockbroker1702/stockbroker170200834/71258399-studio-portrait-of-male-photographer-with-camera.jpg', price: 2000, description: 'الوصف', city: 'بورسعيد', town: 'بورسعيد' }
  ];
  currentPage: number = 1;
  itemsPerPage: number = 16;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.favoritePhotographers = JSON.parse(localStorage.getItem('favoritePhotographers') || '[]');
  }

  navigateToDetails(photographerId: number): void {
    this.router.navigate(['/photographer-details', photographerId]);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  getPaginatedPhotographers(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.photographers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  addToFavorites(photographer: any): void {
    if (!this.favoritePhotographers.some(c => c.id === photographer.id)) {
      this.favoritePhotographers.push(photographer);
      localStorage.setItem('favoritePhotographers', JSON.stringify(this.favoritePhotographers));
    }
  }

  removeFromFavorites(photographer: any): void {
    this.favoritePhotographers = this.favoritePhotographers.filter(c => c.id !== photographer.id);
    localStorage.setItem('favoritePhotographers', JSON.stringify(this.favoritePhotographers));
  }

  isFavorite(photographer: any): boolean {
    return this.favoritePhotographers.some(c => c.id === photographer.id);
  }

  truncateDescription(description: string): string {
    const words = description.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return description;
  }
}
