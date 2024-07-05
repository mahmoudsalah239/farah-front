import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FavouritesService } from '../../services/favourites.service';
import { Photographer } from '../../interfaces/photographer';
import { DotsPipe } from "../../Pipes/dots.pipe";
import { SpinnerComponent } from "../spinner/spinner.component";

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

  constructor(private router: Router, private fav: FavouritesService) {}

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

  toogleFavorite(id: number) {
    this.fav.toggleFavorite(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getfavSericves();
      },
    });
  }
}
