// import { TestBed } from '@angular/core/testing';
// import { AppComponent } from './app.component';
// import { provideRouter } from '@angular/router';
// import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
// import { HttpClient, provideHttpClient } from '@angular/common/http';
// import { HttpLoaderFactory } from '../main'; // Import factory from main.ts
// import { of } from 'rxjs';

// // Mock TranslateLoader
// class FakeLoader implements TranslateLoader {
//   getTranslation(lang: string) {
//     return of({ APP_TITLE: 'Mock Title' }); // Provide mock translations
//   }
// }

// describe('AppComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AppComponent], // Import standalone component
//       providers: [
//         provideRouter([]), // Provide router mock
//         provideHttpClient(), // Provide HttpClient
//         // Provide TranslateService with a mock loader
//         importProvidersFrom(
//           TranslateModule.forRoot({
//             loader: { provide: TranslateLoader, useClass: FakeLoader },
//           })
//         ),
//         TranslateService, // Ensure TranslateService is provided
//       ],
//     }).compileComponents();
//   });

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   it(`should have the current year`, () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app.currentYear).toEqual(new Date().getFullYear());
//   });

//   it('should render title', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const translate = TestBed.inject(TranslateService); // Get TranslateService instance
//     translate.use('en-US'); // Set a language for the test
//     fixture.detectChanges(); // Trigger change detection
//     const compiled = fixture.nativeElement as HTMLElement;
//     // Check for the translated title (using the mock value)
//     expect(compiled.querySelector('h1')?.textContent).toContain('Mock Title');
//   });
// });
