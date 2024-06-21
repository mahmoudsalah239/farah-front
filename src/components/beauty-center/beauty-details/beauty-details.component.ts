import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-beauty-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
templateUrl: './beauty-details.component.html',
  styleUrl: './beauty-details.component.scss'
})


  export class BeautyDetailsComponent implements OnInit {
    features: string = '';
    currentImage: string = '';
    center: any; 
  
    thumbnails: {thumb: string, large: string}[] = [
      {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'},
      {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'},
      {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'},
      {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'}
    ];
  
    changeImage(imageSrc: string): void {
      this.currentImage = imageSrc;
    }
  
    centers = [
      { id: 1,owner:'a', name: 'مركز تجميل 1', imageUrl: 'https://mostaql.hsoubcdn.com/uploads/portfolios/835649/61a1e466eb008/Beauty-Centre-2.jpg', price: 3000, description: 'الوصف' },
      { id: 2,owner:'b', name: 'مركز تجميل 2', imageUrl: 'https://mostaql.hsoubcdn.com/uploads/thumbnails/835649/5fb1c7c34bc0a/Beauty-Centre-1.jpg', price: 4000, description: 'الوصف' },
      { id: 3,owner:'c', name: 'مركز تجميل 3', imageUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/bc1bfb70157027.5b99e26e3d2f2.jpg', price: 5000, description: 'الوصف' },
      { id: 4,owner:'d', name: 'مركز تجميل 4', imageUrl: 'https://i.pinimg.com/736x/e1/ba/c4/e1bac453a27eb88be3fb05fd64bcf3b6.jpg', price: 2000, description: 'الوصف'}
    ];
  
  
    constructor(private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      const dressId = +this.route.snapshot.paramMap.get('id')!;
      this.center = this.centers.find(c => c.id === dressId);
      if (this.center) {
        this.currentImage = this.center.imageUrl;
      }
    }
  }
  
