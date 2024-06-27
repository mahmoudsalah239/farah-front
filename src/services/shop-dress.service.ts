import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopDressService {

  private baseUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  getAllShopsDress(page: number, pageSize: number, priceRange: string, govId: number, cityId: number): Observable<any> {
    const url = `${this.baseUrl}/ShopDresses?page=${page}&pageSize=${pageSize}&priceRange=${priceRange}&govId=${govId}&cityId=${cityId}`;
    return this.http.get<any>(url);
  }
}
