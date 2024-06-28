import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class CustomerInfoService {
  private baseUrl = `${environment.apiUrl}/Account/updateCustomerInfo`;
  private baseUrl2 = `${environment.apiUrl}/Account/getCustomerInfo`;
  constructor(private http: HttpClient) {}

  // getAllOwners(
  //   page: number,
  //   pageSize: number,
  //   accountStatus: number | null,
  //   isBlocked: boolean | null
  // ): Observable<any> {
  //   const url = `${environment.baseUrl}/Admin/owners`;
  //   const params = {
  //     page: page.toString(),
  //     pageSize: pageSize.toString(),
  //     status:
  //       accountStatus !== null
  //         ? accountStatus !== 0
  //           ? accountStatus.toString()
  //           : '0'
  //         : '',
  //     isBlocked: isBlocked ? isBlocked.toString() : '',
  //   };

  //   return this.http.get(url, { params });
  // }

  // toggleBlockStatus(
  //   ownerId: string,
  //   action: 'block' | 'unblock'
  // ): Observable<any> {
  //   const url = `${environment.baseUrl}/Admin/${action}Owner`;
  //   const params = { ownerId };

  //   const queryParams = new HttpParams().set('ownerId', ownerId);

  //   return this.http.put(url, null, { params: queryParams });
  // }

  // GetCustomerDetails(CustomerId: string): Observable<any> {
  //   const token =
  //     localStorage.getItem('token') || sessionStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const url = `${environment.apiUrl}/Admin/GetOwnerById/${CustomerId}`;
  //   return this.http.get(url, { headers });
  // }

  // acceptOwner(ownerId: string): Observable<any> {
  //   const token =
  //     localStorage.getItem('token') || sessionStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const url = `${environment.baseUrl}/Admin/AcceptOwner?ownerId=${ownerId}`;
  //   return this.http.put(url, headers);
  // }
  // declineOwner(ownerId: string): Observable<any> {
  //   const token =
  //     localStorage.getItem('token') || sessionStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const url = `${environment.baseUrl}/Admin/DeclineOwner?ownerId=${ownerId}`;
  //   return this.http.put(url, headers);
  // }
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
