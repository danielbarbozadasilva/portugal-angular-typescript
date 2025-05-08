import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '@app/core/store/reducers-map';
import { selectAuthLoading, selectAuthError, selectRecoverySuccess } from '@app/core/store/auth/auth.selectors';
import * as AuthActions from '@app/core/store/auth/auth.actions';
import { IResponseError } from '@app/core/models/models.index';

@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './recovery-password.component.html',
})
export class RecoveryPasswordComponent implements OnInit, OnDestroy {
  recoveryForm!: FormGroup;
  loading$: Observable<boolean>;
  error$: Observable<IResponseError | string | null>;
  recoverySuccess$: Observable<boolean>;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading = false;
  formSubmitted = false;
  private subs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public translate: TranslateService
  ) {
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
    this.recoverySuccess$ = this.store.select(selectRecoverySuccess);
  }

  ngOnInit(): void {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.subs.push(
      this.error$.subscribe((e) => (this.errorMessage = e ? (typeof e === 'string' ? e : e.message) : null)),
      this.loading$.subscribe((v) => (this.loading = v)),
      this.recoverySuccess$.subscribe(
        (s) => (this.successMessage = s ? this.translate.instant('passwordRecoverySuccessMessage') : null)
      )
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  onSubmitForm(): void {
    this.formSubmitted = true;
    if (this.recoveryForm.invalid) return;
    this.errorMessage = null;
    this.successMessage = null;
    this.store.dispatch(AuthActions.recoveryPassword({ email: this.recoveryForm.value.email }));
  }
}
