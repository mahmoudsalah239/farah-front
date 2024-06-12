import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Governorate } from '../../interfaces/governorate';
import { City } from '../../interfaces/city';
import { AddressServiceService } from '../../services/address-service.service';

@Component({
  selector: 'app-owner-register',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './owner-register.component.html',
  styleUrl: './owner-register.component.scss'
})
export class OwnerRegisterComponent implements OnInit{
  constructor(private addressService:AddressServiceService){}
  AllGovernments: Governorate[] = [];
  Cites: City[] = [];
  selectedGovernorate: Governorate | null = null; 
   fileName: string = 'No file chosen';
  ngOnInit(): void {
    this.loadGovernorates();

  }

  loadGovernorates(): void {
    this.addressService.getGovernorates().subscribe((response: any) => {
      this.AllGovernments = response.data;
      console.log( this.AllGovernments)
    });
  }

  onGovernorateChange(governorateID: number): void {
    this.addressService
      .getCitiesByGovId(governorateID)
      .subscribe((response: any) => {
        this.Cites = response.data;
      });
  }



  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.fileName = input.files[0].name;
    } else {
      this.fileName = 'No file chosen';
    }
  }

}
