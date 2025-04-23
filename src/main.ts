import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppModule, createTranslateLoader } from './app/app.module';

 export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http, './assets/languages/', '.json');
 }

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()), // HttpClient para standalone
    provideAnimations(),            // se quiser animações
    importProvidersFrom(
      AppModule,
      TranslateModule.forRoot({
        defaultLanguage: 'en-US',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader, // ou HttpLoaderFactory
          deps: [HttpClient],
        },
      })
    ),
  ],
}).catch(err => console.error(err));
