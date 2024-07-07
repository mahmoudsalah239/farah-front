import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserNamePipe } from '../../Pipes/user-name.pipe';
import { CustomerInfoService } from '../../services/customer-info.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, UserNamePipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  profileImageUrl: string = '../../assets/download.png';

  userInfo: any;
  IsLogin: boolean = false;

  FullName: string = '';
  constructor(private loginService: LoginService
    , private profileService:CustomerInfoService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.profileImageUrl = localStorage.getItem('profileImageUrl')||'';
    
    console.log(localStorage.getItem('name'));
    this.loginService.userInfo.subscribe((user) => {
      this.userInfo = user;
    });
    this.profileService.profileImageUrl$.subscribe(url => {
      this.profileImageUrl = url;
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
    this.router.navigate(['/home']);
  }
}
