import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BeautyCenter } from '../../interfaces/beauty-center';
import { FavouritesService } from '../../services/favourites.service';
import { DotsPipe } from "../../Pipes/dots.pipe";
import { SpinnerComponent } from "../spinner/spinner.component";
import { ChatService } from '../../services/chat.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-favorite-center',
    standalone: true,
    templateUrl: './favorite-center.component.html',
    styleUrls: ['./favorite-center.component.scss'],
    imports: [CommonModule, RouterLink, DotsPipe, SpinnerComponent]
})
export class FavoriteCenterComponent implements OnInit {
  favoriteBeautyCenter: BeautyCenter[] = [];
  isload: boolean = false;

  constructor( private chatService: ChatService,
    private router: Router, private fav: FavouritesService) {}

  ngOnInit(): void {
    this.getfavSericves();
  }
  getfavSericves() {
    this.fav.getFavourites().subscribe({
      next: (res) => {
        console.log(res.data);

        this.favoriteBeautyCenter = res.data.beautyCenters;
        // this.favoritebeautyCenters = res.data.;
        // this.favoriteshopDresses = res.data.shopDresses;
        // this.favoritephotographys = res.data.favoritephotographys;
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

  toogleFavorite(id: number) {
    this.fav.toggleFavorite(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getfavSericves();
      },
    });
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
