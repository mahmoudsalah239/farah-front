import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dress',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './dress.component.html',
  styleUrl: './dress.component.scss'
})
export class DressComponent  implements OnInit  {

  dresses = [
    { id: 1, imageUrl: 'https://ae01.alicdn.com/kf/S916a1c72f07f4f779f6159f93e3eb81bR/GiayMus-Muslim-Luxury-Lace-Wedding-Dress-with-Long-Sleeves-High-Neck-Beaded-Saudi-Arabia-2024-Bridal.jpg', price: 1500, name: 'فستان 1', description: 'الوصف 1', city: 'القاهرة', town: 'القاهرة' },
    { id: 2, imageUrl: 'https://www.inweddingdress.com/blog/wp-content/uploads/wedding-dresses-41-1.jpg', price: 3000, name: 'فستان 2', description: 'الوصف 2', city: 'الإسكندرية', town: 'الإسكندرية' },
    { id: 3, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/032/937/172/small_2x/fashionable-mannequin-showcases-elegant-wedding-dress-free-photo.jpg', price: 4500, name: 'فستان 3', description: 'الوصف 3', city: 'الجيزة', town: 'الجيزة' },
    { id: 4, imageUrl: 'https://ae01.alicdn.com/kf/H99cc02fb910848a594ccbf30200c5d29d/J67224-Elegant-Sweetheart-Princess-Wedding-Dresses-2020-Appliques-Ball-Gowns-Long-Sleeve-Crystal-Lace-Up-Back.jpg', price: 5000, name: 'فستان 4', description: 'الوصف 4', city: 'بورسعيد', town: 'بورسعيد' }
  ];

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 16;
  selectedCity: string = '';
  selectedTown: string = '';
  maxPrice: number = 5000;

  towns: string[] = [
    'القاهرة',
    'الإسكندرية',
    'الجيزة',
    'بورسعيد'
  ];

  cities: string[] = [
    'القاهرة',
    'الإسكندرية',
    'الجيزة',
    'بورسعيد'
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.filterDresses();
  }

  get filteredDresses() {
    return this.dresses.filter(dress => {
      return (!this.selectedTown || dress.town === this.selectedTown)
        && (!this.selectedCity || dress.city === this.selectedCity)
        && (dress.price <= this.maxPrice);
    });
  }

  filterDresses() {
    this.currentPage = 1;  // Reset pagination to the first page after filtering
  }

  // Pagination methods
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  getPaginatedDresses(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredDresses.slice(startIndex, startIndex + this.itemsPerPage);
  }

  truncateDescription(description: string): string {
    const words = description.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return description;
  }
}


