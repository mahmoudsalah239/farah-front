import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
private ApiUrl = `${environment.apiUrl}/Account/login`
  constructor(private http:HttpClient) { }


  login(customerData:any):Observable<any>{ 
     const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
   return this.http.post(this.ApiUrl,customerData,{headers})
  }
}
