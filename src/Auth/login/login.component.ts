import { Component, OnInit, NgZone } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { SendOtpService } from '../../services/send-otp.service';
import { ResetPasswordService } from '../../services/reset-password.service';
import { PromptMomentNotification, CredentialResponse } from 'google-one-tap';
import { CustomResponse } from '../../interfaces/custom-response';
import { AuthUserDTO } from '../../interfaces/auth-user-dto';

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
    private ngZone: NgZone,
    private sendOtpService: SendOtpService,
    private resetPasswordService: ResetPasswordService
  ) {}

  ngOnInit(): void {
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

    if (
      typeof formData.email === 'string' &&
      typeof formData.password === 'string'
    ) {
      this._loginService.login(formData).subscribe({
        next: (response) => {
          console.log(response);
          this.isLoading = false;
          if (response && response.body.succeeded && response.body.data.token) {
            const token = response.body.data.token;
            const role = response.body.data.role;
            const isConfirmed = response.body.data.isEmailConfirmed;
            this._loginService.storeToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem('name', response.body.data.name);
            localStorage.setItem('email', formData.email);

            if (role === 'Admin' || role === 'Owner') {
              Swal.fire({
                icon: 'error',
                title: 'ممنوع الدخول',
                text: 'لا يمكنك الدخول هنا. يرجى تسجيل الدخول إلى لوحة التحكم.',
                confirmButtonText: 'حسنًا',
              }).then(() => {
                localStorage.clear();
                sessionStorage.clear();
                // this.router.navigate(['/dashboard-login']);
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

  openForgotPasswordPopup() {
    Swal.fire({
      title: 'استعادة كلمة المرور',
      input: 'email',
      inputLabel: 'أدخل بريدك الإلكتروني',
      inputPlaceholder: 'البريد الإلكتروني',
      showCancelButton: true,
      confirmButtonText: 'إرسال',
      cancelButtonText: 'إلغاء',
      inputValidator: (value) => {
        if (!value) {
          return 'يرجى إدخال بريدك الإلكتروني!';
        }
        return null;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const email = result.value;
        this.sendForgotPasswordEmail(email);
      }
    });
  }
  promptForOtp(errorMessage?: string) {
    Swal.fire({
      icon: 'info',
      title: 'تم إرسال رمز التفعيل',
      text:
        errorMessage ||
        'تم إرسال رمز التفعيل إلى بريدك الإلكتروني. يرجى إدخال الرمز هنا لتفعيل بريدك الإلكتروني:',
      input: 'text',
      inputPlaceholder: 'أدخل رمز التفعيل',
      showCancelButton: true,
      confirmButtonText: 'تأكيد',
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        const otp = result.value;
        this.verifyOtp(otp);
      }
    });
  }

  verifyOtp(otp: string) {
    // this.spinner.show();
    this.sendOtpService.confirmEmail(otp).subscribe({
      next: (verifyResponse) => {
        // this.spinner.hide();
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
          this.promptForOtp(
            'الرمز غير صحيح أو منتهي الصلاحية. يرجى المحاولة مرة أخرى.'
          );
        }
      },
      error: (error) => {
        // this.spinner.hide();
        this.promptForOtp('حدث خطأ أثناء التحقق من الرمز. حاول مرة أخرى.');
      },
    });
  }

  sendForgotPasswordEmail(email: string) {
    this.resetPasswordService.forgetPassword(email).subscribe({
      next: (response: any) => {
        if (response && response.succeeded) {
          Swal.fire({
            icon: 'success',
            title: 'تم الإرسال',
            text: 'تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني. صالح لمدة 30 يومًا.',
          });
        } else {
          this.promptForOtp(
            'الرمز غير صحيح أو منتهي الصلاحية. يرجى المحاولة مرة أخرى.'
          );
        }
      },
      error: (error) => {
        // this.spinner.hide();
        this.promptForOtp(
          'الرمز غير صحيح أو منتهي الصلاحية. يرجى المحاولة مرة أخرى.'
        );
      },
    });
  }
}
