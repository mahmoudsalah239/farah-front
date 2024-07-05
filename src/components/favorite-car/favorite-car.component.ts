import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Car } from '../../interfaces/car';
import { FavouritesService } from '../../services/favourites.service';
import { DotsPipe } from "../../Pipes/dots.pipe";
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
    selector: 'app-favorite',
    standalone: true,
    templateUrl: './favorite-car.component.html',
    styleUrls: ['./favorite-car.component.scss'],
    imports: [CommonModule, RouterLink, DotsPipe, SpinnerComponent]
})
export class FavoriteCarComponent implements OnInit {

  favoriteCars: Car[] = [];
  isload: boolean = false;

  constructor(private router: Router, private fav: FavouritesService) {}

  ngOnInit(): void {
    this.getfavSericves();
  }
  getfavSericves() {
    this.fav.getFavourites().subscribe({
      next: (res) => {
        console.log(res.data);

        this.favoriteCars = res.data.cars;
        // this.favoritebeautyCenters = res.data.beautyCenters;
        // this.favoriteshopDresses = res.data.shopDresses;
        // this.favoritephotographys = res.data.favoritephotographys;
      },
    });
  }

  //  removeService(id:number){
  //   Swal.fire({
  //     title: 'هل انتا متاكد ؟',
  //     text: 'تريد حذف هذه الخدمه ممن المفضله ؟',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'نعم احذفها ',
  //     cancelButtonText: 'لا اتركها '
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // User confirmed deletion, call API to remove service
  //       this.fav.toggleFavorite(id).subscribe({
  //         next: (res) => {
  //           console.log(res);
  //           // Optionally show success message
  //           Swal.fire('تم الحذف ', 'success');
  //           // Refresh service list or perform any necessary actions
  //           this.getfavSericves();
  //         },
  //         error: (err) => {
  //           console.error('تم :', err);
  //           Swal.fire('Error!', 'Failed to delete service.', 'error');
  //         }
  //       });
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       // User canceled deletion, do nothing or show a message
  //       Swal.fire('تم الالغاء', 'خدمتك بأمان  :)');
  //     }
  //   });

  //  }

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


