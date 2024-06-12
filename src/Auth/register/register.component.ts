import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { matchPasswords } from '../../interfaces/validators';
import { AddressServiceService } from '../../services/address-service.service';
import { Governorate } from '../../interfaces/governorate';
import { City } from '../../interfaces/city';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,CommonModule],


templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  AllGovernments: Governorate[] = [];
  Cites: City[] = [];
  selectedGovernorate: Governorate | null = null;

  constructor(private formBuilder: FormBuilder, private addressService:AddressServiceService,
   private regservice:RegisterService
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      ssn: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      governorate: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      yourFavirotePerson : ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadGovernorates();

    this.registerForm
      .get('governorate')
      ?.valueChanges.subscribe((governorateID: number) => {
        if (governorateID) {
          this.onGovernorateChange(governorateID);
        } else {
          this.Cites = [];
          this.registerForm
            .get('city')
            ?.reset({ value: '', disabled: true });
        }
      });
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
        this.registerForm.get('city')?.enable();
      });
  }
  onSubmit() {
   
    if (this.registerForm.valid) {
      this.regservice.register(this.registerForm.value).subscribe({
        next:(res)=>{
console.log(res);
        }
      })
  
      console.log(this.registerForm.value);
    }
  }





}
