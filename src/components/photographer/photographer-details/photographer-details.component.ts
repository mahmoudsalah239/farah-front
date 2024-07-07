import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavouritesService } from '../../../services/favourites.service';
import { Photographer } from './../../../interfaces/photographer';
import { PhotographerService } from '../../../services/photographer.service';
import Swal from 'sweetalert2';
import { ChatService } from '../../../services/chat.service';
@Component({
  selector: 'app-photographer-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],

templateUrl: './photographer-details.component.html',
  styleUrl: './photographer-details.component.scss'
})
export class PhotographerDetailsComponent implements OnInit {
  Photographer!: Photographer;
  currentImage: string = '';
  thumbnails: { thumb: string, large: string }[] = [];

  constructor(private route: ActivatedRoute, private photoS: PhotographerService
    ,private fav:FavouritesService , private chatService: ChatService,

    private router: Router

  ) { }

 carId = Number(this.route.snapshot.paramMap.get('id')) ;
  ngOnInit(): void {
    if (this.carId) {
      this.getPhotographerById(this.carId);
    }
  }

  getPhotographerById(id: number): void {
    this.photoS.getPhotographerById(id).subscribe({
      next: (res) => {
        this.Photographer = res.data;
        console.log(res.data);
        
        if (this.Photographer.pictureUrls && this.Photographer.pictureUrls.length > 0) {
          this.currentImage = 'https://localhost:44322' + this.Photographer.pictureUrls[0];
          this.populateThumbnails();
        }
      }
    });
  }

  populateThumbnails(): void {
    this.thumbnails = this.Photographer.pictureUrls.map(url => ({
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

        this.getPhotographerById(this.carId);
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
  



