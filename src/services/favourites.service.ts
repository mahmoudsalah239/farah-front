import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  // https://localhost:44322/api/FavoriteService/Toggle?serviceID=2008
  // https://localhost:44322/api/FavoriteService
  private baseUrl = `${environment.apiUrl}/FavoriteService`;
  constructor(private http: HttpClient) { }

  toggleFavorite(serviceID: number): Observable<any> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('serviceID', serviceID.toString());

    return this.http.post(`${this.baseUrl}/Toggle`, {}, { headers, params });
  }
  
  getFavourites(): Observable<any> {
    const token =localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.baseUrl,{headers});
  }
}
