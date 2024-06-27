import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { DotsPipe } from '../../Pipes/dots.pipe';
import { AddressServiceService } from '../../services/address-service.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ShopDressService } from '../../services/shop-dress.service';
@Component({
  selector: 'app-dress',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, DotsPipe, SpinnerComponent],
  templateUrl: './dress.component.html',
  styleUrl: './dress.component.scss'
})
export class DressComponent  implements OnInit  {
  AllGovernments: any[] = [];
  Cites: any[] = []; 
  selectedTown: string = '';
  selectedCity: number = 0;
  selectedPriceRange: string = 'all';
  dress: any = [];
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 1;
  nodressMessage: string = '';
  registerForm: FormGroup;
  isload: boolean = false;
  constructor(
    private shopService: ShopDressService,
    private addressService: AddressServiceService,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      govID: [''],
      cityID: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    this.loadGovernorates();

    this.registerForm
      .get('govID')
      ?.valueChanges.subscribe((governorateID: number) => {
        if (governorateID) {
          this.onGovernorateChange(governorateID);
        } else {
          this.Cites = [];
          this.registerForm.get('cityID')?.reset({ value: '', disabled: true });
        }
      });

    this.filterShop();
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
      this.addressService
        .getCitiesByGovId(governorateID)
        .subscribe((response: any) => {
          this.Cites = response.data;
          this.registerForm.get('cityID')?.enable();
          this.selectedCity = 0;
          this.selectedTown = governorateID.toString(); // تحديث المحافظة المختارة
          this.currentPage = 1; // إعادة تعيين الصفحة الحالية إلى 1 عند تغيير المحافظة
          this.filterShop();
        });
    } else {
      this.Cites = [];
      this.selectedCity = 0;
      this.registerForm.get('cityID')?.disable();
      this.currentPage = 1; // إعادة تعيين الصفحة الحالية إلى 1 عند إلغاء تحديد المحافظة
      this.filterShop();
    }
  }

  filterShop(): void {
    const govId = this.selectedTown ? Number(this.selectedTown) : 0;
    const cityId = this.selectedCity || 0;
this.isload=true;
    this.shopService.getAllShopsDress
      (
        this.currentPage,
        this.pageSize,
        this.selectedPriceRange,
        govId,
        cityId
      )
      .subscribe({
        
        next: (data) => {
          this.isload=false;
          this.dress = data.data;
          this.totalPages = data.paginationInfo.totalPages;
          this.nodressMessage = '';
        },
        error: (error) => {
          this.isload=false;
          if (error.status === 404) {
            this.dress = [];
            this.nodressMessage = 'No Halls Found';
          } else {
            console.error('An error occurred:', error);
            this.nodressMessage = 'An error occurred while fetching the data.';
          }
        },
      });
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filterShop();
    }
  }

  getPaginateddress(): any[] {
    return this.dress;
  }

  truncateDescription(description: string): string {
    return description.length > 100
      ? description.substring(0, 100) + '...'
      : description;
  }
}


