import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authReducer } from './States/Reducers/auth.reducer';
import { loggingInterceptor } from './Interceptors';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthEffects } from './States/Effects/auth.effects';
import { chatReducer } from './States/Reducers/chat.reducer';
import { ChatEffects } from './States/Effects/chat.effects';
import { IncidentEffects } from './States/Effects/incident.effects';
import { IncidentReducer } from './States/Reducers/Incidence.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideStore({ auth: authReducer , chat: chatReducer,incident:IncidentReducer}),
    provideEffects([AuthEffects,ChatEffects,IncidentEffects]), 
    provideHttpClient(withInterceptors([loggingInterceptor])), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
