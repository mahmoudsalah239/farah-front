import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { CustomResponse } from '../interfaces/custom-response';
import { AuthUserDTO } from '../interfaces/auth-user-dto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userInfo = new BehaviorSubject<any>(null);
  isLoggedIn = new BehaviorSubject<boolean>(false);
  private ApiUrl = `${environment.apiUrl}/Account/login`;

  constructor(private http: HttpClient) {
    this.setInformationOfUser();
  }

  login(customerData: any): Observable<any> {
    return this.http.post(this.ApiUrl, customerData, { observe: 'response' });
  }

  setInformationOfUser() {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      const decodedToken: any = jwtDecode(userToken);
      this.userInfo.next(decodedToken);
      this.isLoggedIn.next(true);
      console.log('Decoded token:', decodedToken);
      const nameIdentifier =
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ];
      console.log('Name Identifier:', nameIdentifier);
    } else {
      this.isLoggedIn.next(false);
    }
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
    this.setInformationOfUser();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    this.userInfo.next(null);
    this.isLoggedIn.next(false);
  }

  googleLogin(response: string): Observable<CustomResponse<AuthUserDTO>> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .post<CustomResponse<AuthUserDTO>>(
        `${environment.apiUrl}/Account/googleLogin`,
        { googleToken: response },
        { headers: header }
      )
      .pipe(
        tap((res: CustomResponse<AuthUserDTO>) => {
          if (res.succeeded && res.data.token) {
            this.storeToken(res.data.token);
          }
        })
      );
  }
}
