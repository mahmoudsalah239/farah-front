import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { City } from './../../interfaces/city';
import Swal from 'sweetalert2';
import { Governorate } from './../../interfaces/governorate';
import { AddressServiceService } from '../../services/address-service.service';
import { CustomerInfoService } from '../../services/customer-info.service';

import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  AllGovernments: Governorate[] = [];
  Cites: City[] = [];
  profileImageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressServiceService,
    private customerservice: CustomerInfoService,
    private profileService: CustomerInfoService
  ) {
    this.editProfileForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      SSN: ['', Validators.required],
      GovID: ['', Validators.required],
      CityID: [{ value: '', disabled: true }, Validators.required],
      YourFavirotePerson: ['', Validators.required],
      profileImage: [''],
    });
  }

  ngOnInit(): void {
    let email = localStorage.getItem('email');
    if (email) {
      this.GetOwnerProfileInfo(email);
    } else {
      console.error('Email not found in local storage.');
    }
    this.loadGovernorates();

    this.editProfileForm
      .get('GovID')
      ?.valueChanges.subscribe((governorateID: number) => {
        if (governorateID) {
          this.onGovernorateChange(governorateID);
        } else {
          this.Cites = [];
          this.editProfileForm
            .get('CityID')
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
        this.editProfileForm.get('CityID')?.enable();
      });
  }

  GetOwnerProfileInfo(Email: string): void {
    this.customerservice.GetCustomerInfo(Email).subscribe(
      (response: any) => {
        console.log(response);
        const data = response.data;
        console.log('customer Info:', data); // Debug log

        if (data) {
          this.editProfileForm.patchValue({
            FirstName: data.firstName,
            LastName: data.lastName,
            Email: data.email,
            PhoneNumber: data.phoneNumber,
            SSN: data.ssn,
            GovID: data.govID,
            CityID: data.cityID,
            YourFavirotePerson: data.yourFavirotePerson,
          });
          const imageUrl = `${environment.UrlForImages}${data.profileImage}`;
          this.profileImageUrl = imageUrl;
          this.profileService.setProfileImageUrl(imageUrl);
        } else {
          console.error('Data is undefined or null');
        }
      },
      (error: any) => {
        console.error('Error fetching owner info:', error);
      }
    );
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.editProfileForm.markAllAsTouched();

    if (this.editProfileForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'يرجى ملء جميع الحقول وإضافة الصور.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('FirstName', this.editProfileForm.get('FirstName')?.value);
    formData.append('LastName', this.editProfileForm.get('LastName')?.value);
    formData.append('Email', this.editProfileForm.get('Email')?.value);
    formData.append(
      'PhoneNumber',
      this.editProfileForm.get('PhoneNumber')?.value
    );
    formData.append('SSN', this.editProfileForm.get('SSN')?.value);
    formData.append('GovID', this.editProfileForm.get('GovID')?.value);
    formData.append('CityID', this.editProfileForm.get('CityID')?.value);
    formData.append(
      'YourFavirotePerson',
      this.editProfileForm.get('YourFavirotePerson')?.value
    );

    if (this.selectedFile) {
      formData.append('SetNewProfileImage', this.selectedFile);
    }

    this.customerservice.UpdateCustomerInfo(formData).subscribe(
      (response: any) => {
        console.log(response);

        Swal.fire({
          icon: 'success',
          title: 'نجاح',
          text: 'تم تحديث البيانات بنجاح.',
        });

        if (this.selectedFile) {
          const reader = new FileReader();
          reader.onload = () => {
            const imageUrl = reader.result as string;
            this.profileService.setProfileImageUrl(imageUrl);
          };
          reader.readAsDataURL(this.selectedFile);
        }
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'حدث خطأ أثناء تحديث البيانات.',
        });
      }
    );
  }

  getCurrentOwnerID(): any {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const id: string = decodedToken.uid;
      return id;
    }
    return null;
  }
}
