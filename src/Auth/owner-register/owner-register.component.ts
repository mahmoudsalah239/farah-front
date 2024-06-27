import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Governorate } from '../../interfaces/governorate';
import { City } from '../../interfaces/city';
import { AddressServiceService } from '../../services/address-service.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SendOtpService } from '../../services/send-otp.service';
import Swal from 'sweetalert2';
import { mustMatch } from '../../interfaces/validators';

@Component({
  selector: 'app-owner-register',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './owner-register.component.html',
  styleUrls: ['./owner-register.component.scss'],
})  
export class OwnerRegisterComponent implements OnInit {
  registerForm: FormGroup;
  AllGovernments: Governorate[] = [];
  Cites: City[] = [];
  selectedGovernorate: Governorate | null = null;
  profileImageUrl: string | null = null;
  idFrontImageUrl: string | null = null;
  idBackImageUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressServiceService,
    private registerService: RegisterService,
    private sendOtpService: SendOtpService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      ssn: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      serviceType: new FormControl('', Validators.required),
      govID: new FormControl('', Validators.required),
      cityID: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      yourFavirotePerson: new FormControl('', Validators.required),
      profileImage: new FormControl('', Validators.required),
      idFrontImage: new FormControl('', Validators.required),
      idBackImage: new FormControl('', Validators.required)
    },   { validators: mustMatch('password', 'confirmPassword') });
  }

  ngOnInit(): void {
    this.loadGovernorates();

    this.registerForm.get('govID')?.valueChanges.subscribe((governorateID) => {
      if (governorateID) {
        this.onGovernorateChange(governorateID);
      } else {
        this.Cites = [];
        this.registerForm.get('cityID')?.reset({ value: '', disabled: true });
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
        this.registerForm.get('cityID')?.enable();
      });
  }

  onFileSelected(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.registerForm.get(controlName)?.setValue(input.files[0]);
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (controlName === 'profileImage') {
          this.profileImageUrl = e.target.result;
        } else if (controlName === 'idFrontImage') {
          this.idFrontImageUrl = e.target.result;
        } else if (controlName === 'idBackImage') {
          this.idBackImageUrl = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.spinner.show();
      const formData = new FormData();
      for (const key in this.registerForm.value) {
        if (this.registerForm.value.hasOwnProperty(key)) {
          formData.append(key, this.registerForm.value[key]);
        }
      }

      formData.forEach(( key,value) => {
        console.log(`${key}: ${value}`);
      });
      this.registerService.OwnerRegister(formData).subscribe({
        next: (res) => {
          this.spinner.hide();
          if (res.body && res.body.data && res.body.data.token) {
            localStorage.setItem('token', res.body.data.token);
            this.promptForOtp();
          } else {
            this.showError();
          }
        },
        error: () => {
          this.spinner.hide();
          this.showError();
        },
      });
    }
  }

  promptForOtp() {
    Swal.fire({
      icon: 'info',
      title: 'تأكيد OTP',
      text: 'تم إرسال OTP إلى بريدك الإلكتروني. الرجاء إدخاله أدناه:',
      input: 'text',
      inputPlaceholder: 'أدخل OTP',
      showCancelButton: true,
      confirmButtonText: 'تحقق',
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        const otp = result.value;
        this.verifyOtp(otp);
      }
    });
  }

  verifyOtp(otp: string) {
    this.spinner.show();
    this.sendOtpService.confirmEmail(otp).subscribe({
      next: (verifyResponse) => {
        this.spinner.hide();
        if (verifyResponse && verifyResponse.succeeded) {
          Swal.fire({
            icon: 'success',
            title: 'تم التحقق من البريد الإلكتروني',
            text: 'تم التحقق من بريدك الإلكتروني بنجاح. يمكنك الآن تسجيل الدخول.',
          }).then(() => {
            this.router.navigate(['/login']);
          });
        } else {
          this.promptForOtpWithMessage('OTP غير صالح أو منتهي. حاول مرة أخرى.');
        }
      },
      error: () => {
        this.spinner.hide();
        this.promptForOtpWithMessage(
          'حدث خطأ أثناء التحقق من OTP. حاول مرة أخرى.'
        );
      },
    });
  }

  promptForOtpWithMessage(message: string) {
    Swal.fire({
      icon: 'info',
      title: 'تأكيد OTP',
      text: message,
      input: 'text',
      inputPlaceholder: 'أدخل OTP',
      showCancelButton: true,
      confirmButtonText: 'تحقق',
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        const otp = result.value;
        this.verifyOtp(otp);
      }
    });
  }

  showError() {
    Swal.fire({
      icon: 'error',
      title: 'عذرًا...',
      text: 'حدث خطأ ما!',
      footer: '<a href="#">لماذا أواجه هذه المشكلة؟</a>',
    });
  }
}
