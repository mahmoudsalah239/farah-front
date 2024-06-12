import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],

templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,private _loginService:LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {


    if (this.loginForm.valid) {
   this._loginService.login(this.loginForm.value).subscribe({
    next:(res)=>{
console.log(res);

    }
   })
      console.log(this.loginForm)
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
