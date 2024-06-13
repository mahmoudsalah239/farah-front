import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-hall',
  standalone:true,
  templateUrl: './hall.component.html',
  imports: [CommonModule,RouterLink],
  styleUrls: ['./hall.component.scss']
})
export class HallComponent implements OnInit {
  halls = [
    { id: 1, imageUrl: 'https://www.arabiaweddings.com/sites/default/files/styles/max980/public/listing/2023/08/10/royal_plaza.jpg?itok=pnzy7apt', price: 'السعر', name: 'اسم القاعة', description: 'الوصف' },
    { id: 2, imageUrl: 'https://www.ramstarab.com/wp-content/uploads/2021/12/%D8%B5%D9%88%D8%B1%D8%A9-%D9%81%D8%B1%D8%AD-17.jpg', price: 'السعر', name: 'اسم القاعة', description: 'الوصف' },
    { id: 3, imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgFw7SnZQ7AEx4zBwTjCM-ALnLihCUHaomWLTP9X_tF5JtjyTImG7jlPcFwTW4v8WwzBT1kHNYRTBHwJLoRu53CNF73mS_Ptus1eJ_20j9zkJ5thoVE15XYAd73NHdiP3NsictAOB3Z73bNU1s2VdD8RrGmxnQB7w05_bUxRg8OJz4EaLfRz2yMETzqip8e/s1668/318627933_704502801026406_2918971883659758944_n.jpg', price: 'السعر', name: 'اسم القاعة', description: 'الوصف' },
    { id: 4, imageUrl: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', price: 'السعر',  name: 'اسم القاعة',description: 'الوصف' }
  ];

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 16; 

  constructor(private router: Router) { }

  ngOnInit(): void {
    
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

  
  truncateDescription(description: string): string {
    const words = description.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return description;
  }
}
