import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FavouritesService } from '../../services/favourites.service';
import Swal from 'sweetalert2';
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

   removeService(id:number){
    Swal.fire({
      title: 'هل انتا متاكد ؟',
      text: 'تريد حذف هذه الخدمه ممن المفضله ؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم احذفها ',
      cancelButtonText: 'لا اتركها '
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed deletion, call API to remove service
        this.favService.remaoveFromFav(id).subscribe({
          next: (res) => {
            console.log(res);
            // Optionally show success message
            Swal.fire('تم الحذف ', 'success');
            // Refresh service list or perform any necessary actions
            this.getfavSericves();
          },
          error: (err) => {
            console.error('تم :', err);
            Swal.fire('Error!', 'Failed to delete service.', 'error');
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User canceled deletion, do nothing or show a message
        Swal.fire('تم الالغاء', 'خدمتك بأمان  :)');
      }
    });
  
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