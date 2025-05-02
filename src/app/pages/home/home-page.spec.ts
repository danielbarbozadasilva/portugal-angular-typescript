// /* Actions e Selectors reais do componente */
// import { loadActivities } from '../../core/store/activity/activity.actions';
// import { selectAllActivities, selectActivityError } from '../../core/store/activity/activity.selectors';
// import jasmine from 'jasmine';
// import { describe, it } from 'mocha';
// import { expect } from 'chai';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HomeComponent } from './home-page.component';
// import { provideMockStore, MockStore } from '@ngrx/store/testing';
// import { Store } from '@ngrx/store';
// import { TranslateModule } from '@ngx-translate/core';
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-apresentation',
//   template: '<p>Mock Apresentation</p>',
//   standalone: true,
// })
// class MockApresentationComponent {}

// @Component({
//   selector: 'app-search-activities',
//   template: '<p>Mock SearchActivities</p>',
//   standalone: true,
//   inputs: ['activities', 'filters', 'currentPage', 'totalPages'],
//   outputs: ['onFilterChange', 'onSearch', 'onPageChange'],
// })
// class MockSearchActivitiesComponent {}

// @Component({
//   selector: 'app-hero',
//   template: '<p>Mock Hero</p>',
//   standalone: true,
// })
// class MockHeroComponent {}

// @Component({
//   selector: 'app-showcase',
//   template: '<p>Mock Showcase</p>',
//   standalone: true,
// })
// class MockShowcaseComponent {}

// @Component({
//   selector: 'app-gastronomy',
//   template: '<p>Mock Gastronomy</p>',
//   standalone: true,
// })
// class MockGastronomyComponent {}

// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;
//   let store: MockStore;
//   let dispatchSpy: jasmine.Spy;

//   const mockActivities: any = [
//     { _id: '1', name: 'Atividade 1', description: 'Teste 1', price: 100 },
//     { _id: '2', name: 'Atividade 2', description: 'Teste 2', price: 150 },
//   ];

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         HomeComponent,
//         TranslateModule.forRoot(),
//         MockApresentationComponent,
//         MockSearchActivitiesComponent,
//         MockHeroComponent,
//         MockShowcaseComponent,
//         MockGastronomyComponent,
//       ],
//       providers: [
//         // Fornecemos a store mockada
//         provideMockStore(),
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     store = TestBed.inject(Store) as MockStore;

//     // Sobrescrevemos os seletores com valores default
//     store.overrideSelector(selectAllActivities, []);
//     store.overrideSelector(selectActivityError, null);

//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;

//     dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
//     fixture.detectChanges(); // Realiza a primeira detecção de mudanças
//   });

//   afterEach(() => {
//     store.resetSelectors();
//     fixture.destroy();
//   });

//   it('deve criar o componente', () => {
//     expect(component).toBeTruthy();
//   });

//   it('deve renderizar o container principal com classe .home-container', () => {
//     const compiled: HTMLElement = fixture.nativeElement;
//     const homeContainer = compiled.querySelector('.home-container');
//     expect(homeContainer).toBeTruthy();
//   });

//   it('deve ter chamado fetchActivities() no ngOnInit()', () => {
//     // O ngOnInit chama fetchActivities(), que faz dispatch de loadActivities
//     expect(dispatchSpy).toHaveBeenCalledWith(loadActivities({ filters: jasmine.arguments(Object) }));
//   });

//   it('deve atualizar "activities" ao receber dados do seletor selectAllActivities', () => {
//     // Mockamos o seletor para retornar mockActivities
//     store.overrideSelector(selectAllActivities, mockActivities);
//     store.refreshState(); // Força o store a emitir
//     fixture.detectChanges();

//     // Checa se o componente atualizou
//     expect(component.activities.length).toBe(2);
//     expect(component.activities[0].name).toBe('Atividade 1');
//   });

//   it('deve exibir erro de store no console quando selectActivityError tiver valor', () => {
//     const consoleErrorSpy = spyOn(console, 'error');

//     store.overrideSelector(selectActivityError, 'Erro de teste');
//     store.refreshState();
//     fixture.detectChanges();

//     expect(consoleErrorSpy).toHaveBeenCalledWith('[HomeComponent] Error from Activity Store:', 'Erro de teste');
//   });

//   it('deve chamar loadActivities com filtros atualizados ao executar fetchActivities()', () => {
//     component.filters = {
//       keyword: 'rio',
//       category: '',
//       startDate: '',
//       endDate: '',
//       minPrice: '',
//       maxPrice: '',
//       language: '',
//       lat: '',
//       lng: '',
//       sort: '',
//     };
//     component.currentPage = 2;
//     component.itemsPerPage = 5;

//     component.fetchActivities();
//     const expectedPayload = {
//       filters: {
//         ...component.filters,
//         page: 2,
//         limit: 5,
//       },
//     };
//     expect(dispatchSpy).toHaveBeenCalledWith(loadActivities(expectedPayload));
//   });

//   it('handleFilterChange deve atualizar o valor do filtro no component.filters', () => {
//     component.handleFilterChange('keyword', 'Praia');
//     expect(component.filters.keyword).toBe('Praia');

//     // Se sort = 'location', deve tentar geolocalização. Podemos simular e verificar console
//     spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((success) => {
//       const position = { coords: { latitude: 10, longitude: 20 } };
//       (success as Function)(position);
//     });
//     component.handleFilterChange('sort', 'location');
//     fixture.detectChanges();

//     expect(component.filters.lat).toBe('10');
//     expect(component.filters.lng).toBe('20');
//     expect(component.filters.sort).toBe('location');
//   });

//   it('handleSearch deve resetar currentPage para 1 e chamar fetchActivities()', () => {
//     const fetchActivitiesSpy = spyOn(component, 'fetchActivities');
//     component.currentPage = 5;
//     component.handleSearch();
//     expect(component.currentPage).toBe(1);
//     expect(fetchActivitiesSpy).toHaveBeenCalled();
//   });

//   it('handlePageChange deve atualizar currentPage e chamar fetchActivities()', () => {
//     const fetchActivitiesSpy = spyOn(component, 'fetchActivities');
//     component.handlePageChange(3);
//     expect(component.currentPage).toBe(3);
//     expect(fetchActivitiesSpy).toHaveBeenCalled();
//   });

//   it('ngOnDestroy deve completar o subject destroy$', () => {
//     const completeSpy = spyOn((component as any).destroy$, 'complete').and.callThrough();
//     fixture.destroy();
//     expect(completeSpy).toHaveBeenCalled();
//   });
// });
