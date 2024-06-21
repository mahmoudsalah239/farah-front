import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorite-center',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorite-center.component.html',
  styleUrls: ['./favorite-center.component.scss']
})
export class FavoriteCenterComponent implements OnInit {

  favoriteCenters: any[] = [];
  centers = [
    { id: 1, name: 'مركز تجميل 1', imageUrl: 'https://mostaql.hsoubcdn.com/uploads/portfolios/835649/61a1e466eb008/Beauty-Centre-2.jpg', price: 3000, description: 'الوصف', city: 'القاهرة', town: 'القاهرة' },
    { id: 2, name: 'مركز تجميل 2', imageUrl: 'https://mostaql.hsoubcdn.com/uploads/thumbnails/835649/5fb1c7c34bc0a/Beauty-Centre-1.jpg', price: 4000, description: 'الوصف', city: 'الإسكندرية', town: 'الإسكندرية' },
    { id: 3, name: 'مركز تجميل 3', imageUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/bc1bfb70157027.5b99e26e3d2f2.jpg', price: 5000, description: 'الوصف', city: 'الجيزة', town: 'الجيزة' },
    { id: 4, name: 'مركز تجميل 4', imageUrl: 'https://i.pinimg.com/736x/e1/ba/c4/e1bac453a27eb88be3fb05fd64bcf3b6.jpg', price: 2000, description: 'الوصف', city: 'بورسعيد', town: 'بورسعيد' }
  ];

  currentPage: number = 1;
  itemsPerPage: number = 16;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.favoriteCenters = JSON.parse(localStorage.getItem('favoriteCenters') || '[]');
  }
  
  addToFavorites(car: any): void {
    if (!this.favoriteCenters.some(c => c.id === car.id)) {
      this.favoriteCenters.push(car);
      localStorage.setItem('favoriteCars', JSON.stringify(this.favoriteCenters));
    }
  }

  navigateToDetails(centerId: number): void {
    this.router.navigate(['/beauty-details', centerId]);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  getPaginatedCenters(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.centers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  removeFromFavorites(center: any): void {
    this.favoriteCenters = this.favoriteCenters.filter(c => c.id !== center.id);
    localStorage.setItem('favoriteCenters', JSON.stringify(this.favoriteCenters));
  }

  isFavorite(center: any): boolean {
    return this.favoriteCenters.some(c => c.id === center.id);
  }

  truncateDescription(description: string): string {
    const words = description.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return description;
  }
}
