import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { SendOtpService } from '../../services/send-otp.service';
import { ResetPasswordService } from '../../services/reset-password.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  errorMessage: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    rememberMe: new FormControl(false),
  });

  constructor(
    private router: Router,
    private _loginService: LoginService,
    private sendOtpService: SendOtpService,
    private resetPasswordService: ResetPasswordService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.invalid || this.isLoading) {
      return;
    }
    this.isLoading = true;
    const formData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      rememberMe: !!this.loginForm.value.rememberMe,
    };

    if (typeof formData.email === 'string' && typeof formData.password === 'string') {
      this._loginService.login(formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response && response.body.succeeded && response.body.data.token) {
            const token = response.body.data.token;
            const role = response.body.data.role;
            const isConfirmed = response.body.data.isEmailConfirmed;
            this._loginService.storeToken(token);

            if (role === 'Admin' || role === 'Owner') {
              Swal.fire({
                icon: 'error',
                title: 'ممنوع الدخول',
                text: 'لا يمكنك الدخول هنا. يرجى تسجيل الدخول إلى لوحة التحكم.',
                confirmButtonText: 'حسنًا',
              }).then(() => {
                localStorage.clear();
                sessionStorage.clear();
                this.router.navigate(['/dashboard-login']);
              });
            } else if (role === 'Customer') {
              if (!isConfirmed) {
                this.sendOtpService.resendOTP().subscribe({
                  next: () => {
                    Swal.fire({
                      icon: 'info',
                      title: 'لم يتم تأكيد البريد الإلكتروني',
                      text: 'تم إرسال رمز التفعيل إلى بريدك الإلكتروني. يرجى إدخال الرمز هنا لتفعيل بريدك الإلكتروني:',
                      input: 'text',
                      inputPlaceholder: 'أدخل رمز التفعيل',
                      showCancelButton: true,
                      confirmButtonText: 'تأكيد',
                      cancelButtonText: 'إلغاء',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        const otp = result.value;
                        this.sendOtpService.confirmEmail(otp).subscribe({
                          next: (verifyResponse) => {
                            if (verifyResponse && verifyResponse.succeeded) {
                              Swal.fire({
                                icon: 'success',
                                title: 'تم التفعيل بنجاح',
                                text: 'تم تفعيل بريدك الإلكتروني بنجاح. يمكنك الآن تسجيل الدخول.',
                              }).then(() => {
                                localStorage.clear();
                                sessionStorage.clear();
                                this.router.navigate(['/login']);
                              });
                            } else {
                              Swal.fire({
                                icon: 'error',
                                title: 'خطأ',
                                text: 'الرمز غير صحيح أو منتهي الصلاحية. يرجى المحاولة مرة أخرى.',
                              });
                            }
                          },
                          error: () => {
                            Swal.fire({
                              icon: 'error',
                              title: 'خطأ',
                              text: 'حدث خطأ أثناء التحقق من الرمز. حاول مرة أخرى.',
                            });
                          },
                        });
                      }
                    });
                  },
                  error: () => {
                    Swal.fire({
                      icon: 'error',
                      title: 'خطأ',
                      text: 'حدث خطأ أثناء إرسال الرمز. حاول مرة أخرى.',
                    });
                  },
                });
              } else {
                Swal.fire({
                  icon: 'success',
                  title: 'تم الدخول بنجاح',
                  text: 'تم تسجيل الدخول بنجاح',
                  confirmButtonText: 'حسنًا',
                }).then(() => {
                  this.router.navigate(['/home']);
                });
              }
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text: 'حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.',
            });
          }
        },
        error: () => {
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.',
          });
        },
      });
    }
  }

  goToRegister(type: string): void {
    if (type === 'buyer') {
      this.router.navigate(['/register']);
    } else if (type === 'seller') {
      this.router.navigate(['/OwnerRegister']);
    }
  }
}
