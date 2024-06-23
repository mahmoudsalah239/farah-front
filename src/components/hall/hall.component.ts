import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HallService } from '../../services/hall.service';
import { Hall } from '../../interfaces/hall';
import { DotsPipe } from '../../Pipes/dots.pipe';
import { AddressServiceService } from '../../services/address-service.service';
import { Governorate } from '../../interfaces/governorate';
import { City } from '../../interfaces/city';

@Component({
  selector: 'app-hall',
  standalone: true,
  templateUrl: './hall.component.html',
  imports: [CommonModule, RouterLink, FormsModule,DotsPipe],
  styleUrls: ['./hall.component.scss'],
})
export class HallComponent implements OnInit {
  halls: Hall[] = [];
  filteredHalls: Hall[] = [];
  towns: string[] = ['Town1', 'Town2', 'Town3']; // Replace with actual data
  cities: string[] = ['City1', 'City2', 'City3']; // Replace with actual data
  selectedTown: string = '';
  selectedCity: string = '';
  maxPrice: number = 5000;
  selectedPrice: string = 'all';
  errorMessage: string | null = null;
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 6;
  AllGovernments: Governorate[] = [];
  Cites: City[] = [];

  // towns: string[] = ['القاهرة', 'الإسكندرية', 'الجيزة', 'بورسعيد'];

  // cities: string[] = ['القاهرة', 'الإسكندرية', 'الجيزة', 'بورسعيد'];

  constructor(private router: Router, private hallService: HallService,private addressService:AddressServiceService) {}

  ngOnInit(): void {
    this.loadGovernorates();
    this.loadHalls();
  }
  loadHalls(): void {
    this.hallService.getAllHalls(this.currentPage, this.pageSize).subscribe({
     next: (response) => {
        if (response.succeeded) {
          this.halls = response.data;
          this.totalPages = response.paginationInfo.totalPages;
          console.log(response.data);
          
        } else {
          this.errorMessage = response.message;
        }
      },
     error: (error) => {
        this.errorMessage = 'Error fetching data';
        console.error(error);
      }
    }
      
    );
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadHalls();
  }


  loadGovernorates(): void {
    this.addressService.getGovernorates().subscribe((response: any) => {
      this.AllGovernments = response.data;
    });
  }

  onGovernorateChange(governorateID: number): void {
    this.addressService
      .getCitiesByGovId(governorateID)
      .subscribe((response: any) => {
        this.Cites = response.data;
        // this.registerForm.get('cityID')?.enable();
      });
  }



  
  }

  







