import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PhotographerService {
  private baseUrl = `${environment.apiUrl}`;
  // https://localhost:44322/api/Photography?page=1&pageSize=12

  constructor(private http: HttpClient) { }

  getAllphotographer(page: number, pageSize: number): Observable<any> {
    const url = `${this.baseUrl}/Photography?page=${page}&pageSize=${pageSize}`;
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(url, { headers});
  }
  getPhotographerById(id:number):Observable<any>{
    const url = `${this.baseUrl}/Photography/GetPhotographerById`;
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<any>(url, { headers,params});
   } 

}
