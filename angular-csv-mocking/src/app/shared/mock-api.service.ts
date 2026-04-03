import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  // 🔥 Fully dynamic GET (list / filtered / by id)
  getResource<T>(
    resource: string,
    options?: {
      id?: string | number;
      params?: Record<string, any>;
    }
  ): Observable<T> {

    let url = `${this.baseUrl}/${resource}`;

    // ✅ Handle /api/users/1
    if (options?.id) {
      url += `/${options.id}`;
    }

    // ✅ Handle query params
    let httpParams = new HttpParams();
    if (options?.params) {
      Object.keys(options.params).forEach(key => {
        httpParams = httpParams.set(key, options.params![key]);
      });
    }

    return this.http.get<T>(url, { params: httpParams });
  }

  // 🔥 POST
  createResource<T>(resource: string, payload: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${resource}`, payload);
  }

  // 🔥 PUT
  updateResource<T>(
    resource: string,
    id: string | number,
    payload: any
  ): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${resource}/${id}`, payload);
  }

  // 🔥 DELETE
  deleteResource<T>(
    resource: string,
    id: string | number
  ): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${resource}/${id}`);
  }
}