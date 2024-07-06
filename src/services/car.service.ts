
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { param } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private baseUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  getAllCars(page: number, pageSize: number, priceRange: string, govId: number, cityId: number): Observable<any> {
    const url = `${this.baseUrl}/Car/Cars?page=${page}&pageSize=${pageSize}&priceRange=${priceRange}&govId=${govId}&cityId=${cityId}`;
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(url, { headers});
  }
  GetCarById(id:string):Observable<any>{
    const url = `${this.baseUrl}/Car/CarByID?id=${id}`;
    return this.http.get<any>(url);
   } 
   
}

