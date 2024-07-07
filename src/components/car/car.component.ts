import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { DotsPipe } from '../../Pipes/dots.pipe';
import { AddressServiceService } from '../../services/address-service.service';
import { SpinnerComponent } from '../spinner/spinner.component';
  import { FavouritesService } from './../../services/favourites.service';
import Swal from 'sweetalert2'; 
import { Car } from '../../interfaces/car';
import { ChatService } from '../../services/chat.service';
@Component({
  selector: 'app-car',
  standalone: true,
  templateUrl: './car.component.html',
  imports: [CommonModule, RouterLink, FormsModule, DotsPipe, SpinnerComponent],

styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  AllGovernments: any[] = [];
  Cites: any[] = [];
  selectedTown: string = '';
  selectedCity: number = 0;
  selectedPriceRange: string = 'all';
  cars: any[] = [];
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 1;
  noCarsMessage: string = '';
  isload: boolean = false;
  registerForm: FormGroup;

  constructor(
    private carService: CarService,
    private addressService: AddressServiceService,
    private fb: FormBuilder,
    private fav:FavouritesService,   private chatService: ChatService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      govID: [''],
      cityID: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    this.loadGovernorates();

    this.registerForm.get('govID')?.valueChanges.subscribe((governorateID: number) => {
      if (governorateID) {
        this.onGovernorateChange(governorateID);
      } else {
        this.Cites = [];
        this.registerForm.get('cityID')?.reset({ value: '', disabled: true });
      }
    });

    this.filterCars();
  }

  loadGovernorates(): void {
    this.isload = true;
    this.addressService.getGovernorates().subscribe((response: any) => {
      this.AllGovernments = response.data;
      this.isload = false;
    });
  }

  onGovernorateChange(governorateID: number): void {
    if (governorateID) {
      this.addressService.getCitiesByGovId(governorateID).subscribe((response: any) => {
        this.Cites = response.data;
        this.registerForm.get('cityID')?.enable();
        this.selectedCity = 0;
        this.selectedTown = governorateID.toString(); // Update selected governorate
        this.currentPage = 1; // Reset to first page on governorate change
        this.filterCars(); // Filter cars when governorate changes
      });
    } else {
      this.Cites = [];
      this.selectedCity = 0;
      this.registerForm.get('cityID')?.disable();
      this.currentPage = 1; // Reset to first page on governorate deselection
      this.filterCars(); // Filter cars when governorate changes
    }
  }

  filterCars(): void {
    const govId = this.registerForm.get('govID')?.value || 0;
    const cityId = this.selectedCity || 0;

    this.isload = true;
    this.carService.getAllCars(this.currentPage, this.pageSize, this.selectedPriceRange, govId, cityId)
      .subscribe({
        next: (data) => {
          this.isload = false;
          this.cars = data.data;
          this.totalPages = data.paginationInfo.totalPages;
          console.log(data.data);
        },
        error: (error) => {
          this.isload = false;
          if (error.status === 404) {
            this.cars = [];
          } else {
            console.error('An error occurred:', error);
          }
        }
      });
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filterCars();
    }
  }

  getPaginatedCars(): Car[] {
    return this.cars;
  }



  truncateDescription(description: string): string {
    return description.length > 100 ? description.substring(0, 100) + '...' : description;
  }

  
  toogleFavorite(id:number){
    this.fav.toggleFavorite(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.filterCars();
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
