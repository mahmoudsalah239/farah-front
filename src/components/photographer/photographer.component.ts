import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { HallService } from '../../services/hall.service';
import { Hall } from '../../interfaces/hall';
import { DotsPipe } from '../../Pipes/dots.pipe';
import { AddressServiceService } from '../../services/address-service.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { PhotographerService } from '../../services/photographer.service';
@Component({
  selector: 'app-photographer',
  standalone: true,
  templateUrl: './photographer.component.html',
  imports: [CommonModule, RouterLink, FormsModule, DotsPipe, SpinnerComponent],
  
styleUrls: ['./photographer.component.scss']
})
export class PhotographerComponent implements OnInit {
  AllGovernments: any[] = [];
  Cites: any[] = [];
  selectedTown: string = '';
  selectedCity: number = 0;
  selectedPriceRange: string = 'all';
  photographer:any = [];
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 1;
  nophotographerMessage: string = '';
  registerForm: FormGroup;
  isload: boolean = false;
  constructor(
    private PhotographerS: PhotographerService,
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

    this.filterphotographers();
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
          this.filterphotographers();
        });
    } else {
      this.Cites = [];
      this.selectedCity = 0;
      this.registerForm.get('cityID')?.disable();
      this.currentPage = 1; // إعادة تعيين الصفحة الحالية إلى 1 عند إلغاء تحديد المحافظة
      this.filterphotographers();
    }
  }

  filterphotographers(): void {
    const govId = this.selectedTown ? Number(this.selectedTown) : 0;
    const cityId = this.selectedCity || 0;
this.isload=true;
    this.PhotographerS.getAllPhotographers
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
          this.photographer = data.data;
          this.totalPages = data.paginationInfo.totalPages;
          this.nophotographerMessage = '';
        },
        error: (error) => {
          this.isload=false;
          if (error.status === 404) {
            this.photographer = [];
            this.nophotographerMessage = 'No Halls Found';
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
  addToFavorites(){

  }
  getPaginatedphotographer(): Hall[] {
    return this.photographer;
  }

  truncateDescription(description: string): string {
    return description.length > 100
      ? description.substring(0, 100) + '...'
      : description;
  }

}
