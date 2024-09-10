import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { headerInterceptor } from './core/interceptors/header.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { lodeingInterceptor } from './core/interceptors/lodeing.interceptor';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes , withViewTransitions()), provideClientHydration() , provideHttpClient(withFetch() , withInterceptors([headerInterceptor,errorInterceptor , lodeingInterceptor]))
, provideAnimations(),
importProvidersFrom(NgxSpinnerModule),
provideToastr({
  progressBar:true,
  timeOut:2000,
  closeButton:true,

})
]
};


