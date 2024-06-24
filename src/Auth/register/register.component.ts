import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
// import Swal from 'sweetalert2';
import { AddressServiceService } from '../../services/address-service.service';
import { Governorate } from '../../interfaces/governorate';
import { City } from '../../interfaces/city';
import { RegisterService } from '../../services/register.service';
import { mustMatch } from '../../interfaces/validators';
import { NgxSpinnerService } from 'ngx-spinner';
import { SendOtpService } from '../../services/send-otp.service';
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
    private router: Router,

    private addressService: AddressServiceService,
    private registerService: RegisterService,
    private sendOtpService: SendOtpService,
    private spinner: NgxSpinnerService
  ) {
    this.registerForm = new FormGroup(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        ssn: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{5}$/),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        phoneNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('^01[0-2]{1}[0-9]{8}$'),
        ]),
        govID: new FormControl('', Validators.required),
        cityID: new FormControl('', Validators.required),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', Validators.required),
        yourFavirotePerson: new FormControl('', Validators.required),
      },
      { validators: mustMatch('password', 'confirmPassword') }
    );
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
  onSubmit() {
    if (this.registerForm.valid) {
      this.spinner.show();
      this.registerService.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.spinner.hide();
          localStorage.setItem('token', res.body.data.token);
          this.promptForOtp();
        },
        error: (err) => {
          console.log(err.error.message);
          this.spinner.hide();
          Swal.fire({
            icon: 'error',
            title: 'عذرًا...',
            text: `${err.error.message}`,
            // footer: '<a href="#">لماذا أواجه هذه المشكلة؟</a>',
          });
          console.log(err);
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
            this.router.navigate(['/Login']);
          });
        } else {
          this.promptForOtpWithMessage('OTP غير صالح أو منتهي. حاول مرة أخرى.');
        }
      },
      error: (error) => {
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
}
