import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private ApiUrl=  `${environment.apiUrl}/Account/customerRegister`

  constructor(private http :HttpClient) { }


  register(customerData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.ApiUrl, customerData,{headers});
  }
}
