import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PhotographerService {
  private baseUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  getAllPhotographers(page: number, pageSize: number, priceRange: string, govId: number, cityId: number): Observable<any> {
    const url = `${this.baseUrl}/Photography?page=${page}&pageSize=${pageSize}&priceRange=${priceRange}&govId=${govId}&cityId=${cityId}`;
    return this.http.get<any>(url);
  }

}
