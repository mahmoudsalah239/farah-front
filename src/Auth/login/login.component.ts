import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  errorMessage:string='';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
  });
  constructor(
    private router: Router,
    private _loginService: LoginService,
  ) {}

  ngOnInit(): void {

  }

  onSubmit(): void {
    console.log(this.loginForm);
    
    if (this.loginForm.valid) {
      const formData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      
      this._loginService.login(formData).subscribe(
        {
          next: (respons) => {
            if (respons.succeeded == true) {
              console.log("-------success=True----------")
              console.log(respons)
              localStorage.setItem("userToken",respons.data.token);
              this._loginService.setInformaionOfUser();
              this.router.navigate(["/home"]);
            }
            else {
              console.log("-------success=False----------")
            }
          },
          error:(err)=>{
            console.log(err.error)
            this.errorMessage=err.error.message;
          }
        });
      console.log(this.loginForm);
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
