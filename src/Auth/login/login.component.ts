// import { Component, OnInit } from '@angular/core';
// import {
//   FormControl,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import { LoginService } from '../../services/login.service';
// import { CommonModule } from '@angular/common';
// import Swal from 'sweetalert2';

// import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
// import { SendOtpService } from '../../services/send-otp.service';


// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [RouterLink, ReactiveFormsModule, CommonModule,NgxSpinnerModule],

//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss',
// })
// export class LoginComponent implements OnInit {
//   isLoading = false;
//   errorMessage:string='';
//   loginForm: FormGroup = new FormGroup({
//     email: new FormControl(null, [Validators.required, Validators.email]),
//     password: new FormControl(null, [Validators.required]),
//   });
//   constructor(
//     private router: Router,
//     private _loginService: LoginService,
//     private spinner: NgxSpinnerService,
//     private sendOtpService:SendOtpService,

//   ) {}

//   ngOnInit(): void {
  
//   }

//   onSubmit(): void {
//     if (this.loginForm.invalid || this.isLoading) {
//       return;
//     }
//     this.isLoading = true;
//     this.spinner.show();
//     const formData = {
//       email: this.loginForm.value.email,
//       password: this.loginForm.value.password,
//     };


//     if (typeof formData.email === 'string' && typeof formData.password === 'string') {
//       this._loginService.login(formData).subscribe({
//         next:(response)=>{
//           this.spinner.hide();
//           this.isLoading = false;
//           console.log(response);
          
//           if (response && response.body.succeeded && response.body.data.token) {
//             const token = response.body.data.token;
//             const role = response.body.data.role;
//             const accountStatus = response.body.data.accountStatus;
//             const isConfirmed = response.body.data.isEmailConfirmed;

//             localStorage.setItem('token', token); 
//             if(role=='customer'){
//               if(!isConfirmed){
//                 this.sendOtpService.resendOTP().subscribe({
//                   next: () => {
//                     Swal.fire({
//                       icon: 'info',
//                       title: 'لم يتم تأكيد البريد الإلكتروني',
//                       text: 'تم إرسال رمز التفعيل إلى بريدك الإلكتروني. يرجى إدخال الرمز هنا لتفعيل بريدك الإلكتروني:',
//                       input: 'text',
//                       inputPlaceholder: 'أدخل رمز التفعيل',
//                       showCancelButton: true,
//                       confirmButtonText: 'تأكيد',
//                       cancelButtonText: 'إلغاء',
//                     }).then((result) => {
//                       if (result.isConfirmed) {
//                         const otp = result.value;
//                         this.sendOtpService.confirmEmail(otp).subscribe({
//                           next: (verifyResponse) => {
//                             if (verifyResponse && verifyResponse.succeeded) {
//                               Swal.fire({
//                                 icon: 'success',
//                                 title: 'تم التفعيل بنجاح',
//                                 text: 'تم تفعيل بريدك الإلكتروني بنجاح. يمكنك الآن تسجيل الدخول.',
//                               }).then(() => {
//                                 localStorage.clear();
//                                 sessionStorage.clear();
//                                 this.router.navigate(['/login']);
//                               });
//                             } else {
//                               Swal.fire({
//                                 icon: 'error',
//                                 title: 'خطأ',
//                                 text: 'الرمز غير صحيح أو منتهي الصلاحية. يرجى المحاولة مرة أخرى.',
//                               });
//                             }
//                           },
//                           error: (error) => {
//                             Swal.fire({
//                               icon: 'error',
//                               title: 'خطأ',
//                               text: 'حدث خطأ أثناء التحقق من الرمز. حاول مرة أخرى.',
//                             });
//                           },
//                         });
//                       }
//                     });
//                   },
//                   error: (error) => {
//                     Swal.fire({
//                       icon: 'error',
//                       title: 'خطأ',
//                       text: 'حدث خطأ أثناء إرسال الرمز. حاول مرة أخرى.',
//                     });
//                   },
//                 });

//               }
//             }
//           }

//         }
//       })
//     }

    
//     // if (this.loginForm.valid) {
//     //   const formData = {
//     //     email: this.loginForm.value.email,
//     //     password: this.loginForm.value.password,
//     //   };
      
//     //   this._loginService.login(formData).subscribe(
//     //     {
//     //       next: (respons) => {
//     //         if (respons.succeeded == true) {
//     //           console.log("-------success=True----------")
//     //           console.log(respons)
//     //           localStorage.setItem("userToken",respons.data.token);
//     //           this._loginService.setInformaionOfUser();
//     //           this.router.navigate(["/home"]);
//     //         }
//     //         else {
//     //           console.log("-----success=False-----")
//     //         }
//     //       },
//     //       error:(err)=>{
//     //         console.log(err.error)
//     //         this.errorMessage=err.error.message;
//     //       }
//     //     });
//     //   console.log(this.loginForm);
//     // }
//   }

//   goToRegister(type: string): void {
//     if (type === 'buyer') {
//       this.router.navigate(['/register']);
//     } else if (type === 'seller') {
//       this.router.navigate(['/OwnerRegister']);
//     }
//   }

// }
