import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userInfo = new BehaviorSubject(null);
private ApiUrl = `${environment.apiUrl}/Account/login`
  constructor(private http:HttpClient) { }


  login(customerData:any):Observable<any>{ 
  //    const headers = new HttpHeaders({
  //   'Content-Type': 'application/json'
  // });
   return this.http.post<any>(this.ApiUrl,customerData)
  }
  setInformaionOfUser() {
    let userToken = JSON.stringify(localStorage.getItem("userToken"));
    let decodedToken: any = jwtDecode(userToken);
    console.log("decodeed token hhhh   "+ decodedToken)
    this.userInfo.next(decodedToken);
    console.log("--------setInformaionOfUser---------")
    console.log(this.userInfo.getValue())
    const nameIdentifier = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    console.log("----------------------------")
    console.log(nameIdentifier);
  }

}

