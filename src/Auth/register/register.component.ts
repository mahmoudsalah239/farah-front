import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AddressServiceService } from '../../services/address-service.service';
import { Governorate } from '../../interfaces/governorate';
import { City } from '../../interfaces/city';
import { RegisterService } from '../../services/register.service';
import { mustMatch } from '../../interfaces/validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  AllGovernments: Governorate[] = [];
  Cites: City[] = [];
  selectedGovernorate: Governorate | null = null;

  constructor(
    private addressService: AddressServiceService,
    private regservice: RegisterService
  ) {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      ssn: new FormControl('', [Validators.required, Validators.pattern(/^\d{14}$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      governorate: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required),
      yourFavirotePerson: new FormControl('', Validators.required),
    }, { validators: mustMatch('password', 'confirmPassword') });
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
          this.registerForm.get('city')?.reset({ value: '', disabled: true });
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
      this.regservice.register(this.registerForm).subscribe({
        next: (res) => {
          console.log(res);
        },
      });

      console.log(this.registerForm.value);
    }
  }
}
