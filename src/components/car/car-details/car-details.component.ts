import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarService } from '../../../services/car.service';
import { Car } from '../../../interfaces/car';
import { FavouritesService } from '../../../services/favourites.service';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
})
export class CarDetailsComponent implements OnInit {
  car!: Car;
  currentImage: string = '';
  thumbnails: { thumb: string, large: string }[] = [];

  constructor(private route: ActivatedRoute, private carService: CarService
    ,private fav:FavouritesService
  ) { }

 carId = Number(this.route.snapshot.paramMap.get('id')) ;
  ngOnInit(): void {
    if (this.carId) {
      this.getCarById(this.carId);
    }
  }

  getCarById(id: number): void {
    this.carService.GetCarById(id).subscribe({
      next: (res) => {
        this.car = res.data;
        if (this.car.pictureUrls && this.car.pictureUrls.length > 0) {
          this.currentImage = 'https://localhost:44322' + this.car.pictureUrls[0];
          this.populateThumbnails();
        }
      }
    });
  }

  populateThumbnails(): void {
    this.thumbnails = this.car.pictureUrls.map(url => ({
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
    
      }
}
