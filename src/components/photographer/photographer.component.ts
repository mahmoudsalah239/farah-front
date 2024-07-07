import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { HallService } from '../../services/hall.service';
import { Hall } from '../../interfaces/hall';
import { DotsPipe } from '../../Pipes/dots.pipe';
import { AddressServiceService } from '../../services/address-service.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { PhotographerService } from '../../services/photographer.service';
import { FavouritesService } from '../../services/favourites.service';
import { Photographer } from '../../interfaces/photographer';
import Swal from 'sweetalert2';
import { ChatService } from '../../services/chat.service';
@Component({
  selector: 'app-photographer',
  standalone: true,
  templateUrl: './photographer.component.html',
  imports: [CommonModule, RouterLink, FormsModule, DotsPipe, SpinnerComponent],
    
styleUrls: ['./photographer.component.scss']
})
export class PhotographerComponent implements OnInit {
  
  photographer:Photographer[] = [];
  currentPage: number = 1;
  pageSize: number = 12;
  totalPages: number = 1;
  nophotographerMessage: string = '';
  registerForm: FormGroup;
  isload: boolean = false;
  constructor(
    private PhotographerS: PhotographerService,
    private addressService: AddressServiceService,
    private fb: FormBuilder,
    private fav:FavouritesService,
    private chatService: ChatService,
    private router: Router

  
  ) {
    this.registerForm = this.fb.group({
      govID: [''],
      cityID: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
  
    this.filterphotographers();
  }



  filterphotographers(): void {

    this.PhotographerS.getAllphotographer
      (
        this.currentPage,
        this.pageSize,
      ) 
      .subscribe({
        
        next: (data) => {
          this.isload=false;
          this.photographer = data.data;
          this.totalPages = data.paginationInfo.totalPages;
          this.nophotographerMessage = '';
        },
        error: (error) => {
          this.isload=false;
          if (error.status === 404) {
            this.photographer = [];
            this.nophotographerMessage = 'No photographer Found';
          } else {
            console.error('An error occurred:', error);
            this.nophotographerMessage = 'An error occurred while fetching the data.';
          }
        },
      });
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filterphotographers();
    }
  }

  getPaginatedphotographer(): Photographer[] {
    return this.photographer;
  }

  truncateDescription(description: string): string {
    return description.length > 100
      ? description.substring(0, 100) + '...'
      : description;
  }

  toogleFavorite(id:number){
    if (localStorage.getItem('token')) {
      this.fav.toggleFavorite(id).subscribe({
        next:(res)=>{
          console.log(res);
          this.filterphotographers();
          
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
