import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hall } from '../../../interfaces/hall';
import { FavouritesService } from '../../../services/favourites.service';
import { AddressServiceService } from '../../../services/address-service.service';
import { HallService } from './../../../services/hall.service';
@Component({
  selector: 'app-hall-details',
  standalone: true,
  imports: [CarouselModule, CommonModule, RouterLink, FormsModule],



  templateUrl: './hall-details.component.html',
  styleUrls: ['./hall-details.component.scss'],
})
export class HallDetailsComponent implements OnInit {
  hall!: Hall;
  currentImage: string = '';
  thumbnails: { thumb: string, large: string }[] = [];

  constructor(private route: ActivatedRoute, private hallService: HallService
    ,private fav:FavouritesService
  ) { }

 carId = Number(this.route.snapshot.paramMap.get('id')) ;
  ngOnInit(): void {
    if (this.carId) {
      this.getCarById(this.carId);
    }
  }

  getCarById(id: number): void {
    this.hallService.GetHallById(id).subscribe({
      next: (res) => {
        this.hall = res.data;
        if (this.hall.pictureUrls && this.hall.pictureUrls.length > 0) {
          this.currentImage = 'https://localhost:44322' + this.hall.pictureUrls[0];
          this.populateThumbnails();
        }
      }
    });
  }

  populateThumbnails(): void {
    this.thumbnails = this.hall.pictureUrls.map(url => ({
      thumb: 'https://localhost:44322' + url,
      large: 'https://localhost:44322' + url
    }));
  }

  changeImage(imageSrc: string): void {
    this.currentImage = imageSrc;
  }
  toogleFavorite(id:number){
    this.fav.toggleFavorite(id).subscribe({
      next:(res)=>{
        console.log(res);

        this.getCarById(this.carId);
        
      }
    })
    
      }}