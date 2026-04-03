import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';


import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { APP_ROUTES } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient,  withInterceptorsFromDi } from '@angular/common/http';
import { MockInterceptor } from './shared/mock.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(APP_ROUTES), 
    // ✅ Enable interceptors from DI
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    // ✅ Register your interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockInterceptor,
      multi: true
    },
    provideClientHydration(withEventReplay()) // ✅ hydration enabled globally
  ]
};
