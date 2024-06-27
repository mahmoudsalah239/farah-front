import { HttpClient } from '@angular/common/http';
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
    
    return this.http.get<any>(url);
  }

   GetHallById(id:number):Observable<any>{
    const url = `${this.ApiUrl}/Hall/CarByID?id=${id}`;
    return this.http.get<any>(url);
   }
}

