import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HallService {
  private ApiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}

  getAllHalls(page: number, pageSize: number, priceRange: string, govId: number, cityId: number): Observable<any> {
    
    const url = `${this.ApiUrl}/Hall/AllHalls?page=${page}&pageSize=${pageSize}&priceRange=${priceRange}&govId=${govId}&cityId=${cityId}`;
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(url, { headers});
  }
 
   GetHallById(id:number):Observable<any>{
    const url = `${this.ApiUrl}/Hall/HallByID`;
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('id', id.toString());

    return this.http.get<any>(url, { headers,params});
   }
}

