import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private ApiUrl = `${environment.apiUrl}/Account`;

  constructor(private http: HttpClient) {}

  register(customerData: any): Observable<any> {
    return this.http.post(`${this.ApiUrl}/customerRegister`, customerData, {
      observe: 'response',
    });
  }
  OwnerRegister(customerData: FormData): Observable<any> {
    return this.http.post<any>(`${this.ApiUrl}/ownerRegister`, customerData);
  }
}
