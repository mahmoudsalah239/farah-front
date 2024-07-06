import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  getAllChats(page: number, pageSize: number): Observable<any> {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${environment.apiUrl}/Chat/my-chats?page=${page}&pageSize=${pageSize}`;
    return this.http.get(url, { headers });
  }

  getChatById(chatId: number): Observable<any> {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${environment.apiUrl}/Chat/${chatId}`;
    return this.http.get(url, { headers });
  }

  GetChatIdFromServices(ownerID: string): Observable<any> {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${environment.apiUrl}/Chat/GetChatBetweenOwnerandCustomer?ownerID=${ownerID}`;
    return this.http.get(url, { headers });
  }
}
