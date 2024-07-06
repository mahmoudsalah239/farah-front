import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BeautyCenter } from '../../../interfaces/beauty-center';
import { BeautyService } from '../../../services/beauty.service';
import { FavouritesService } from '../../../services/favourites.service';
import { AddressServiceService } from '../../../services/address-service.service';

@Component({
  selector: 'app-beauty-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
templateUrl: './beauty-details.component.html',
  styleUrl: './beauty-details.component.scss'
})


  export class BeautyDetailsComponent implements OnInit {
    Beauty!: BeautyCenter
    images: any[] = [];
    activeSlideIndex = 0;
    cityName:string=''
  
    constructor(
      private route: ActivatedRoute,
      private beautyService: BeautyService,
      private fav:FavouritesService,
      private  Address:AddressServiceService,
    ) {}
    ngOnInit(): void {
       const hallId: any = this.route.snapshot.paramMap.get('id');
      
     this.GetBeautyById(hallId);
    }
    GetBeautyById(hallId:number){
      this.beautyService.GetBeautyById(hallId).subscribe({
        next: (data: any) => {
          this.Beauty = data.data;
          console.log(data);
        this.getCityById(data.data.city)
          
          
          
          this.images = this.Beauty.imageUrls?.map((url: string) => ({
            path: 'https://localhost:44322' + url,
            caption: this.Beauty.name,
          }));
        },
        error: (error) => {
          console.error('Error fetching hall details', error);
        },
      });
  
    }
  
    prevSlide(): void {
      this.activeSlideIndex =
        this.activeSlideIndex === 0
          ? this.images.length - 1
          : this.activeSlideIndex - 1;
    }
  
    nextSlide(): void {
      this.activeSlideIndex = (this.activeSlideIndex + 1) % this.images.length;
    }
  
    
    toogleFavorite(id:number){
      this.fav.toggleFavorite(id).subscribe({
        next:(res)=>{
          console.log(res);
  
          this.GetBeautyById(id);
        }
      })
      
        }
  
        getCityById(id:number){
          this.Address.getCityById(id).subscribe({
            next: (data: any) => {
              this.cityName = data.data.name;
           
            }
          })
  
        }
  }
  
