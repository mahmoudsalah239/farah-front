import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent implements OnInit {

  favoriteHalls: any[] = []; 
  halls = [
    { id: 1, imageUrl: 'https://www.arabiaweddings.com/sites/default/files/styles/max980/public/listing/2023/08/10/royal_plaza.jpg?itok=pnzy7apt', price: '7500.00', name: 'قاعة ليلة العمر', description: 'قاعة فاخرة لليالي العمر والمناسبات الخاصة.', city: 'الرياض', town: 'المنصورية' },
    { id: 2, imageUrl: 'https://www.ramstarab.com/wp-content/uploads/2021/12/%D8%B5%D9%88%D8%B1%D8%A9-%D9%81%D8%B1%D8%AD-17.jpg', price: '6000.00', name: 'قاعة الفرح', description: 'قاعة مميزة للاحتفالات والمناسبات.', city: 'جدة', town: 'النعيم' },
    { id: 3, imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgFw7SnZQ7AEx4zBwTjCM-ALnLihCUHaomWLTP9X_tF5JtjyTImG7jlPcFwTW4v8WwzBT1kHNYRTBHwJLoRu53CNF73mS_Ptus1eJ_20j9zkJ5thoVE15XYAd73NHdiP3NsictAOB3Z73bNU1s2VdD8RrGmxnQB7w05_bUxRg8OJz4EaLfRz2yMETzqip8e/s1668/318627933_704502801026406_2918971883659758944_n.jpg', price: '5000.00', name: 'قاعة الزهور', description: 'قاعة أنيقة تناسب جميع المناسبات.', city: 'الدمام', town: 'الدوحة' },
    { id: 4, imageUrl: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', price: '8500.00', name: 'قاعة النخبة', description: 'قاعة فخمة لليالي المميزة.', city: 'مكة', town: 'العزيزية' }
  ];


  currentPage: number = 1;
  itemsPerPage: number = 16; 

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.favoriteHalls = JSON.parse(localStorage.getItem('favoriteHalls') || '[]');
  }

  navigateToDetails(hallId: number): void {
    this.router.navigate(['/hall-details', hallId]);
  }

  // Pagination methods
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  getPaginatedHalls(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.halls.slice(startIndex, startIndex + this.itemsPerPage);
  }

  
  addToFavorites(hall: any): void {
    if (!this.favoriteHalls.some(h => h.id === hall.id)) {
      this.favoriteHalls.push(hall);
      localStorage.setItem('favoriteHalls', JSON.stringify(this.favoriteHalls));
    }
  }

  // Method to remove hall from favorites
  removeFromFavorites(hall: any): void {
    this.favoriteHalls = this.favoriteHalls.filter(h => h.id !== hall.id);
    localStorage.setItem('favoriteHalls', JSON.stringify(this.favoriteHalls));
  }

  // Check if hall is in favorites
  isFavorite(hall: any): boolean {
    return this.favoriteHalls.some(h => h.id === hall.id);
  }

  truncateDescription(description: string): string {
    const words = description.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return description;
  }
}