import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BeautyCenter } from '../../../interfaces/beauty-center';
import { BeautyService } from '../../../services/beauty.service';
import { FavouritesService } from '../../../services/favourites.service';
import { AddressServiceService } from '../../../services/address-service.service';
import { ChatService } from '../../../services/chat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-beauty-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
templateUrl: './beauty-details.component.html',
  styleUrl: './beauty-details.component.scss'
})


  export class BeautyDetailsComponent implements OnInit {
    Beauty!: BeautyCenter;
    currentImage: string = '';
    thumbnails: { thumb: string, large: string }[] = [];
    cityName:string='';
  
    constructor(private route: ActivatedRoute, private beautyService: BeautyService
      ,private fav:FavouritesService , private Address:AddressServiceService,
         private chatService: ChatService,
      private router: Router
    ) { }
  
   carId = Number(this.route.snapshot.paramMap.get('id')) ;
    ngOnInit(): void {
      if (this.carId) {
        this.getBeautyById(this.carId);
      }
    }
  
    getBeautyById(id: number): void {
      this.beautyService.GetBeautyById(id).subscribe({
        next: (res) => {
          this.Beauty = res.data;
          this.getCityById(res.data.city);
          console.log(res);

          
          if (this.Beauty.imageUrls && this.Beauty.imageUrls.length > 0) {
            this.currentImage = 'https://localhost:44322' + this.Beauty.imageUrls[0];
            this.populateThumbnails();
          }
        }
      });
    }
  
    populateThumbnails(): void {
      this.thumbnails = this.Beauty.imageUrls.map(url => ({
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
  
          this.getBeautyById(this.carId);
          
        }
      })
      
        }
        getCityById(id:number){
          this.Address.getCityById(id).subscribe({
            next:(data)=>{
              console.log(data.data.name);
              this.cityName = data.data.name;

              
              
            }
          })
        }


        
  openChat(ownerId: string) {
    if (localStorage.getItem('token')) {
      this.chatService.GetChatIdFromServices(ownerId).subscribe((res) => {
        localStorage.setItem('ownerId', ownerId);
        sessionStorage.setItem('ownerId', res.data.user.id);

        this.router.navigate(['/Chats/chat', res.data.chatId]);
      });
    } else {
      Swal.fire({
        title: 'غير مسجل ',
        text: 'أنت غير مسجل . يجب عليك تسجيل الدخول أولاً.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'تسجيل الدخول',
        cancelButtonText: 'إلغاء',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/Login']);
        }
      });
    }
  }
      
      }  