import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ConsultantFormComponent } from './consultant-form.component';

describe('ConsultantFormComponent', () => {
  let component: ConsultantFormComponent;
  let fixture: ComponentFixture<ConsultantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultantFormComponent, TranslateModule.forRoot()],
      providers: [provideRouter([]), provideHttpClient(), provideStore({})]
    }).compileComponents();
    fixture = TestBed.createComponent(ConsultantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
