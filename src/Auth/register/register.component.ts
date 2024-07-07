import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AddressServiceService } from '../../services/address-service.service';
import { Governorate } from '../../interfaces/governorate';
import { City } from '../../interfaces/city';
import { RegisterService } from '../../services/register.service';
import { mustMatch } from '../../interfaces/validators';
import { NgxSpinnerService } from 'ngx-spinner';
import { SendOtpService } from '../../services/send-otp.service';
import { CredentialResponse } from 'google-one-tap';
import { AuthUserDTO } from '../../interfaces/auth-user-dto';
import { CustomResponse } from '../../interfaces/custom-response';
import { LoginService } from '../../services/login.service';

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
    private spinner: NgxSpinnerService,
    private _loginService: LoginService,
    private ngZone: NgZone
  ) {
    this.registerForm = new FormGroup(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        ssn: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d{14}$/),
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

    //@ts-ignore
    google.accounts.id.initialize({
      client_id:
        '808137901632-58vcgh80pl4h70h11re5v243rqpgeptt.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    //@ts-ignore
    google.accounts.id.renderButton(
      //@ts-ignore
      document.getElementById('google-login-button'),
      {
        theme: 'dark',
        size: 'large',
        type: 'standard',
        text: 'تسجيل الدخول باستخدام Google',
        width: '100%',
      }
    );
    //@ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => {});
  }

  async handleCredentialResponse(response: CredentialResponse) {
    console.log('Send From Front-->', response);
    this._loginService.googleLogin(response.credential).subscribe(
      (res: CustomResponse<AuthUserDTO>) => {
        console.log('Response', res);

        if (res.succeeded) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('name', res.data.fullName);

          this.ngZone.run(() => {
            Swal.fire({
              title: 'تم تسجيل الدخول بنجاح!',
              text:
                res.message || 'لقد قمت بتسجيل الدخول بنجاح باستخدام Google.',
              icon: 'success',
              confirmButtonText: 'موافق',
            }).then(() => {
              this.router.navigate(['/home']).then(() => {
                setTimeout(() => {
                  window.location.reload();
                }, 100);
              });
            });
          });
        } else {
          this.ngZone.run(() => {
            Swal.fire({
              title: 'فشل تسجيل الدخول',
              text:
                res.message ||
                'حدث خطأ أثناء تسجيل الدخول باستخدام Google. يرجى المحاولة مرة أخرى.',
              icon: 'error',
              confirmButtonText: 'موافق',
            });
          });
        }
      },
      (error: any) => {
        console.log(error);
        this.ngZone.run(() => {
          Swal.fire({
            title: 'فشل تسجيل الدخول',
            text: 'حدث خطأ أثناء تسجيل الدخول باستخدام Google. يرجى المحاولة مرة أخرى.',
            icon: 'error',
            confirmButtonText: 'موافق',
          });
        });
      }
    );
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
