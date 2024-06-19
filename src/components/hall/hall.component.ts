

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hall',
  standalone: true,
  templateUrl: './hall.component.html',
  imports: [CommonModule, RouterLink, FormsModule],
  styleUrls: ['./hall.component.scss']
})
export class HallComponent implements OnInit {
  halls = [
    { id: 1, imageUrl: 'https://www.arabiaweddings.com/sites/default/files/styles/max980/public/listing/2023/08/10/royal_plaza.jpg?itok=pnzy7apt', price: 1500, name: 'قاعة 1', description: 'الوصف 1', city: 'القاهرة', town: 'القاهرة' },
    { id: 2, imageUrl: 'https://www.ramstarab.com/wp-content/uploads/2021/12/%D8%B5%D9%88%D8%B1%D8%A9-%D9%81%D8%B1%D8%AD-17.jpg', price: 3000, name: 'قاعة 2', description: 'الوصف 2', city: 'الإسكندرية', town: 'الإسكندرية' },
    { id: 3, imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgFw7SnZQ7AEx4zBwTjCM-ALnLihCUHaomWLTP9X_tF5JtjyTImG7jlPcFwTW4v8WwzBT1kHNYRTBHwJLoRu53CNF73mS_Ptus1eJ_20j9zkJ5thoVE15XYAd73NHdiP3NsictAOB3Z73bNU1s2VdD8RrGmxnQB7w05_bUxRg8OJz4EaLfRz2yMETzqip8e/s1668/318627933_704502801026406_2918971883659758944_n.jpg', price: 4500, name: 'قاعة 3', description: 'الوصف 3', city: 'الجيزة', town: 'الجيزة' },
    { id: 4, imageUrl: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', price: 5000, name: 'قاعة 4', description: 'الوصف 4', city: 'بورسعيد', town: 'بورسعيد' }
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
    this.filterHalls();
  }

  get filteredHalls() {
    return this.halls.filter(hall => {
      return (!this.selectedTown || hall.town === this.selectedTown)
        && (!this.selectedCity || hall.city === this.selectedCity)
        && (hall.price <= this.maxPrice);
    });
  }

  filterHalls() {
    this.currentPage = 1;  // Reset pagination to the first page after filtering
  }

  // Pagination methods
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  getPaginatedHalls(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredHalls.slice(startIndex, startIndex + this.itemsPerPage);
  }

  truncateDescription(description: string): string {
    const words = description.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return description;
  }
}

