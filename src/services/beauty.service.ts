import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class BeautyService {
  private baseUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  getAllBeauty(page: number, pageSize: number, priceRange: string, govId: number, cityId: number): Observable<any> {
    const url = `${this.baseUrl}/BeautyCenter?page=${page}&pageSize=${pageSize}&priceRange=${priceRange}&govId=${govId}&cityId=${cityId}`;
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(url, { headers});
  }

 
}
