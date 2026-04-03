import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  // ✅ Users API
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  // ✅ Get user by ID
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${id}`);
  }

  // ✅ Create user
  createUser(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, payload);
  }

  // ✅ Generic API (optional - reusable)
  get(api: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${api}`);
  }
}