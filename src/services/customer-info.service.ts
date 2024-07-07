import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class CustomerInfoService {
  private baseUrl = `${environment.apiUrl}/Account/updateCustomerInfo`;
  private baseUrl2 = `${environment.apiUrl}/Account/getCustomerInfo`;
  private profileImageUrlSubject = new BehaviorSubject<string>('../assets/download.png');
  profileImageUrl$ = this.profileImageUrlSubject.asObservable();
  constructor(private http: HttpClient) {}


  setProfileImageUrl(url: string) {
    this.profileImageUrlSubject.next(url);
  }

  GetCustomerInfo(email: string) {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl2}?email=${email}`;
    return this.http.get(url, { headers });
  }

  UpdateCustomerInfo(UpdateCustomerInfo: FormData): Observable<any> {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(this.baseUrl, UpdateCustomerInfo, { headers });
  }
}
