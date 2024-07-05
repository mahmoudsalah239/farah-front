import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import Swal from 'sweetalert2';
import { HallService } from '../../services/hall.service';
import { Hall } from '../../interfaces/hall';
import { DotsPipe } from '../../Pipes/dots.pipe';
import { AddressServiceService } from '../../services/address-service.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { FavouritesService } from '../../services/favourites.service';
@Component({
  selector: 'app-favorite',
  standalone: true,
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
  imports: [CommonModule, RouterLink, SpinnerComponent, DotsPipe],
})
export class FavoriteComponent implements OnInit {
  favoriteHalls: Hall[] = [];
  isload: boolean = false;

  constructor(private router: Router, private fav: FavouritesService) {}

  ngOnInit(): void {
    this.getfavSericves();
  }
  getfavSericves() {
    this.fav.getFavourites().subscribe({
      next: (res) => {
        console.log(res.data);

        this.favoriteHalls = res.data.halls;
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
