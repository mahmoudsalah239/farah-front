import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FavouritesService } from '../../services/favourites.service';
import { Photographer } from '../../interfaces/photographer';
import { DotsPipe } from "../../Pipes/dots.pipe";
import { SpinnerComponent } from "../spinner/spinner.component";
import { ChatService } from '../../services/chat.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-favorite',
    standalone: true,
    templateUrl: './favorite-photographer.component.html',
    styleUrls: ['./favorite-photographer.component.scss'],
    imports: [CommonModule, DotsPipe, SpinnerComponent,RouterLink]
})
export class FavoritePhotographerComponent implements OnInit {

  favoritPhotographer: Photographer[] = [];
  isload: boolean = false;

  constructor(   private chatService: ChatService,
    private router: Router , private fav: FavouritesService) {}

  ngOnInit(): void {
    this.getfavSericves();
  }
  getfavSericves() {
    this.fav.getFavourites().subscribe({
      next: (res) => {
        console.log(res.data);

        this.favoritPhotographer = res.data.photographys;
      },
    });
  }

  navigateToDetails(hallId: number): void {
    this.router.navigate(['/hall-details', hallId]);
  }

  truncateDescription(description: string): string {
    const words = description.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return description;
  }

  toogleFavorite(id:number){
    if (localStorage.getItem('token')) {
      this.fav.toggleFavorite(id).subscribe({
        next:(res)=>{
          console.log(res);
          this.getfavSericves();
          
        }
      })
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
