import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HallService } from '../../../services/hall.service';
import { Hall } from '../../../interfaces/hall';
import { FavouritesService } from '../../../services/favourites.service';
import { AddressServiceService } from '../../../services/address-service.service';
import { ChatService } from '../../../services/chat.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-hall-details',
  standalone: true,
  imports: [CarouselModule, CommonModule, RouterLink, FormsModule],

  templateUrl: './hall-details.component.html',
  styleUrls: ['./hall-details.component.scss'],
})
export class HallDetailsComponent implements OnInit {
  hall!: Hall;
  images: any[] = [];
  activeSlideIndex = 0;
  cityName: string = '';
  ownerId: string = '';
  chatId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private hallService: HallService,
    private fav: FavouritesService,
    private Address: AddressServiceService,
    private chatServices: ChatService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const hallId: any = this.route.snapshot.paramMap.get('id');

    this.GetHallById(hallId);
  }
  GetHallById(hallId: number) {
    this.hallService.GetHallById(hallId).subscribe({
      next: (data: any) => {
        this.hall = data.data;
        console.log(data);
        this.ownerId = data.data.ownerID;
        this.getCityById(data.data.city);

        this.images = this.hall.pictureUrls?.map((url: string) => ({
          path: 'https://localhost:44322' + url,
          caption: this.hall.name,
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

  toogleFavorite(id: number) {
    this.fav.toggleFavorite(id).subscribe({
      next: (res) => {
        console.log(res);

        this.GetHallById(id);
      },
    });
  }

  getCityById(id: number) {
    this.Address.getCityById(id).subscribe({
      next: (data: any) => {
        this.cityName = data.data.name;
      },
    });
  }
  async goToMessage(ownerId: string) {
    try {
      const response = await firstValueFrom(
        this.chatServices.GetChatIdFromServices(ownerId)
      );
      this.chatId = response.data.chatId;
      console.log(this.chatId);

      await this.router.navigate(['/Chat', this.chatId]);
    } catch (error) {
      console.error('Error navigating to chat:', error);
    }
  }
}
