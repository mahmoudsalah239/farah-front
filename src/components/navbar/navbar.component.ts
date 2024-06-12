import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
constructor(private _loginservice:LoginService){

}
  IsLogin: boolean = false;

  ngOnInit(): void {
    const token = localStorage.getItem('userToken');
    if (token != null) {
      this.IsLogin = true;
    }
    console.log(this._loginservice.userInfo)
  }

  logout(){
    localStorage.removeItem("userToken");
    this._loginservice.userInfo.next(null);

  }

}
