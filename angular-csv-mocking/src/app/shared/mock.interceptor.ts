import { Injectable, isDevMode } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpBackend,
  HttpClient
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class MockInterceptor implements HttpInterceptor {

  private http: HttpClient;
  private basePath = 'mocks/';

  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler); // ✅ avoids infinite loop
    if (isDevMode()) {
        console.log('Not in production mode - MockInterceptor is active');
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // 👉 Only mock in DEV/ST
    if (!environment.useMock || !req.url.includes('/api/') || window.location.hostname !== 'localhost' || !isDevMode()) {
        console.log('Skipping mock...');
      return next.handle(req);
    }

    const apiName = this.extractApiName(req.url);
    const csvPath = `${this.basePath}${apiName}.csv`;
    console.log('Loading CSV from:', csvPath);

    return this.http.get(csvPath, { responseType: 'text' }).pipe(

      switchMap(csv => {
        let data = this.parseCSV(csv);

        // ✅ Query param filtering
        if (req.params.keys().length) {
          data = data.filter(item =>
            req.params.keys().every(key =>
              item[key]?.toString() === req.params.get(key)
            )
          );
        }

        // ✅ Handle GET /api/users/1
        const idFromUrl = this.extractId(req.url);
        if (idFromUrl) {
          data = data.filter(item => item.id == idFromUrl);
        }

        // ✅ POST simulation
        if (req.method === 'POST') {
          data = { ...req.body, id: Date.now() };
        }

        if (req.method === 'PUT') {
        return of(new HttpResponse({ status: 200, body: req.body }));
        }

        if (req.method === 'DELETE') {
        return of(new HttpResponse({ status: 200 }));
        }

        return of(new HttpResponse({
          status: 200,
          body: data
        })).pipe(delay(300));
      }),

      // 👉 If CSV not found → fallback to real API
      catchError(() => next.handle(req))
    );
  }

  // 🔥 Extract API name dynamically
  private extractApiName(url: string): string {
    // /api/users → users
    // /api/users/1 → users
    return url.split('/api/')[1].split('/')[0].split('?')[0];
  }

  // 🔥 Extract ID (optional)
  private extractId(url: string): string | null {
    const parts = url.split('/api/')[1].split('/');
    return parts.length > 1 ? parts[1] : null;
  }

  // ✅ CSV → JSON parser
  private parseCSV(csv: string): any[] {
    const lines = csv.split('\n').map(l => l.trim()).filter(Boolean);

    const delimiter = lines[0].includes(',')
      ? ','
      : /\s{2,}|\t/;

    const headers = lines[0].split(delimiter).map(h => h.trim());

    return lines.slice(1).map(line => {
      const values = line.split(delimiter).map(v => v.trim());

      const obj: any = {};
      headers.forEach((header, i) => {
        obj[header] = values[i] ?? null;
      });

      return obj;
    });
  }
}