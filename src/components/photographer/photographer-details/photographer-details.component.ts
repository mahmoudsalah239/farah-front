import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-photographer-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './photographer-details.component.html',
  styleUrl: './photographer-details.component.scss'
})
export class PhotographerDetailsComponent implements OnInit {
  features: string = '';
    currentImage: string = '';
    photographer: any; 
  
    thumbnails: {thumb: string, large: string}[] = [
      {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'},
      {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'},
      {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'},
      {thumb: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg', large: 'https://ongineering.com/images/Articles_Aziz/wedding-hall-decoration-design.jpg'}
    ];
  
    changeImage(imageSrc: string): void {
      this.currentImage = imageSrc;
    }
  
    photographers = [
      { id: 1, name: 'مصور 1', imageUrl: 'https://st3.depositphotos.com/12985790/16650/i/1600/depositphotos_166506298-stock-photo-male-photographer-with-digital-camera.jpg', price: 3000, description: 'الوصف', city: 'القاهرة', town: 'القاهرة' },
      { id: 2, name: 'مصور 2', imageUrl: 'https://st2.depositphotos.com/3662505/5821/i/950/depositphotos_58212791-stock-photo-tourists.jpg', price: 4000, description: 'الوصف', city: 'الإسكندرية', town: 'الإسكندرية' },
      { id: 3, name: 'مصور 3', imageUrl: 'https://previews.123rf.com/images/cc0collection/cc0collection2205/cc0collection220540765/186116451-people-man-photographer-photography-canon-camera-lens-kit-dslr-picture-photo.jpg', price: 5000, description: 'الوصف', city: 'الجيزة', town: 'الجيزة' },
      { id: 4, name: 'مصور 4', imageUrl: 'https://previews.123rf.com/images/stockbroker/stockbroker1702/stockbroker170200834/71258399-studio-portrait-of-male-photographer-with-camera.jpg', price: 2000, description: 'الوصف', city: 'بورسعيد', town: 'بورسعيد' }
    ];
  
    constructor(private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      const dressId = +this.route.snapshot.paramMap.get('id')!;
      this.photographer = this.photographers.find(c => c.id === dressId);
      if (this.photographer) {
        this.currentImage = this.photographer.imageUrl;
      }
    }
  }
  



