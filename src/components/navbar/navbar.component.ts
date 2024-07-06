import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserNamePipe } from '../../Pipes/user-name.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, UserNamePipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userInfo: any;
  IsLogin: boolean = false;

  FullName: string = '';
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.userInfo.subscribe((user) => {
      this.userInfo = user;
    });

    this.loginService.isLoggedIn.subscribe((isLoggedIn) => {
      this.IsLogin = isLoggedIn;
    });
    this.FullName =
      localStorage.getItem('name') ||
      '' ||
      sessionStorage.getItem('name') ||
      '';

    this.loginService.setInformationOfUser();
  }

  logout() {
    this.loginService.logout();
  }
}
