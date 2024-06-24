import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SendOtpService {
  private baseUrl = `${environment.apiUrl}/Account`;
  constructor(private http: HttpClient) {}

  resendOTP(): Observable<any> {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/resendOTP`;

    return this.http.get(url, { headers });
  }

  confirmEmail(otp: string): Observable<any> {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/confirmEmail?otp=${otp}`;

    return this.http.post(url, {}, { headers });
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
