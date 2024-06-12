import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Governorate } from '../interfaces/governorate';
import { City } from '../interfaces/city';
import { environment } from '../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AddressServiceService {
  baseUrl= environment.apiUrl;
  constructor(private http: HttpClient) {}

  getGovernorates(): Observable<Governorate[]> {
    return this.http.get<Governorate[]>(`${this.baseUrl}/Governorate`);
  }

  getCitiesByGovId(governorateID: number): Observable<City[]> {
    return this.http.get<City[]>(`${this.baseUrl}/City/${governorateID}`);
  }

}
