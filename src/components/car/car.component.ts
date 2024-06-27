import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';
// import { Car } from '../../interfaces/car';
import { DotsPipe } from '../../Pipes/dots.pipe';
import { AddressServiceService } from '../../services/address-service.service';
import { SpinnerComponent } from '../spinner/spinner.component';


@Component({
  selector: 'app-car',
  standalone: true,
  templateUrl: './car.component.html',
  imports: [CommonModule, RouterLink, FormsModule, DotsPipe,SpinnerComponent],
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
    private fb: FormBuilder
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
    this.addressService.getGovernorates().subscribe((response: any) => {
      this.AllGovernments = response.data;
    });
  }

  onGovernorateChange(governorateID: number): void {
    if (governorateID) {
      this.addressService.getCitiesByGovId(governorateID).subscribe((response: any) => {
        this.Cites = response.data;
        this.registerForm.get('cityID')?.enable();
        this.selectedCity = 0;
        this.filterCars(); // Filter cars when governorate changes
      });
    } else {
      this.Cites = [];
      this.selectedCity = 0;
      this.registerForm.get('cityID')?.disable();
      this.filterCars(); // Filter cars when governorate changes
    }
  }

  filterCars(): void {
    const govId = this.registerForm.get('govID')?.value || 0;
    const cityId = this.selectedCity || 0;

    this.isload = true;
    this.carService.getAllCars(this.currentPage, this.pageSize, this.selectedPriceRange, govId, cityId)
      .subscribe({
        next:  (data) => {
        this.isload = false;
        this.cars = data.data;
        this.totalPages = data.paginationInfo.totalPages;
        this.noCarsMessage = data.data.length === 0 ? 'No cars found' : '';
      },
      error: (error) => {
        this.isload = false;
        this.noCarsMessage = 'Error fetching data';
      }
      }
      );
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filterCars();
    }
  }

  getPaginatedCars(): any[] {
    return this.cars;
  }
  addToFavorites(){

  }
  truncateDescription(description: string): string {
    return description.length > 100 ? description.substring(0, 100) + '...' : description;
  }
}
