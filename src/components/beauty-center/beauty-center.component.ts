import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Hall } from '../../interfaces/hall';
import { DotsPipe } from '../../Pipes/dots.pipe';
import { AddressServiceService } from '../../services/address-service.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { BeautyService } from '../../services/beauty.service';

@Component({
  selector: 'app-beauty-center',
  standalone: true,
  templateUrl: './beauty-center.component.html',
  imports: [CommonModule, RouterLink, FormsModule, DotsPipe, SpinnerComponent],
  styleUrls: ['./beauty-center.component.scss']
})
export class BeautyCenterComponent implements OnInit {
  AllGovernments: any[] = [];
  Cites: any[] = [];
  selectedTown: string = '';
  selectedCity: number = 0;
  selectedPriceRange: string = 'all';
  beauty: any= [];
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 1;
  noBeautyMessage: string = '';
  registerForm: FormGroup;
  isload: boolean = false;
  constructor(
    private beautyService: BeautyService,
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

    this.filterBeauty();
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
          this.filterBeauty();
        });
    } else {
      this.Cites = [];
      this.selectedCity = 0;
      this.registerForm.get('cityID')?.disable();
      this.currentPage = 1; // إعادة تعيين الصفحة الحالية إلى 1 عند إلغاء تحديد المحافظة
      this.filterBeauty();
    }
  }

  filterBeauty(): void {
    const govId = this.selectedTown ? Number(this.selectedTown) : 0;
    const cityId = this.selectedCity || 0;
this.isload=true;
    this.beautyService.getAllBeauty
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
          this.beauty = data.data;
          this.totalPages = data.paginationInfo.totalPages;
          this.noBeautyMessage = '';
        },
        error: (error) => {
          this.isload=false;
          if (error.status === 404) {
            this.beauty = [];
            this.noBeautyMessage = 'No beauty Found';
          } else {
            console.error('An error occurred:', error);
            this.noBeautyMessage = 'An error occurred while fetching the data.';
          }
        },
      });
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filterBeauty();
    }
  }

  getPaginatedBeauty(): Hall[] {
    return this.beauty;
  }

  truncateDescription(description: string): string {
    return description.length > 100
      ? description.substring(0, 100) + '...'
      : description;
  }
}
