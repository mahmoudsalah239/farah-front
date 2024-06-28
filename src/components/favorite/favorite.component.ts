import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FavouritesService } from '../../services/favourites.service';
@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule,RouterLink],


templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent implements OnInit {

  favoriteHalls: any[] = []; 
  favoritebeautyCenters: any[] = []; 
  favoriteCars: any[] = []; 
  favoritephotographys: any[] = []; 
  favoriteshopDresses: any[] = []; 

  constructor(private router: Router, private favService:FavouritesService) { }

  ngOnInit(): void {
this.getfavSericves()
  }
   getfavSericves(){
    this.favService.getFavourites().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.favoriteCars = res.data.cars;
        this.favoriteHalls = res.data.Halls;
        this.favoritebeautyCenters = res.data.beautyCenters;
        this.favoriteshopDresses = res.data.shopDresses;
        this.favoritephotographys = res.data.favoritephotographys;
      }
    })
   }

  navigateToDetails(hallId: number): void {
    this.router.navigate(['/hall-details', hallId]);
  }


 

  
  addToFavorites(hall: any): void {
    if (!this.favoriteHalls.some(h => h.id === hall.id)) {
      this.favoriteHalls.push(hall);
      localStorage.setItem('favoriteHalls', JSON.stringify(this.favoriteHalls));
    }
  }

  // Method to remove hall from favorites
  removeFromFavorites(hall: any): void {
    this.favoriteHalls = this.favoriteHalls.filter(h => h.id !== hall.id);
    localStorage.setItem('favoriteHalls', JSON.stringify(this.favoriteHalls));
  }

  // Check if hall is in favorites
  isFavorite(hall: any): boolean {
    return this.favoriteHalls.some(h => h.id === hall.id);
  }

  truncateDescription(description: string): string {
    const words = description.split(' ');
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + '...';
    }
    return description;
  }
}