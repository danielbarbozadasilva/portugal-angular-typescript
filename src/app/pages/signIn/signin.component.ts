import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, take } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppState } from '../../core/store/reducers-map';
import * as AuthActions from '../../core/store/auth/auth.actions';
import { selectAuthLoading, selectAuthError, selectIsAuthenticated } from '../../core/store/auth/auth.selectors';
import { IResponseError } from '../../core/models/models.index'; // Adjust path if needed

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './signin-component.html',
})

export class SignInComponent implements OnInit, OnDestroy {
  signInForm!: FormGroup;
  isLoading$: Observable<boolean>;
  error$: Observable<IResponseError | string | null>;
  errorMessage: string | null = null;
  private errorSubscription: Subscription | null = null;
  private formChangesSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>, // Use your AppState interface
    private router: Router, // Inject Router for potential redirects
    public translate: TranslateService // Make translate public if used in template
  ) {
    this.isLoading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false], // Optional: Add remember me functionality
    });

    // Subscribe to error changes to display them
    this.errorSubscription = this.error$.subscribe((error) => {
      if (error) {
        this.errorMessage = typeof error === 'string' ? error : error.message;
        // Optionally, mark form controls as invalid based on specific errors
        // if (error.message.includes('email')) {
        //   this.signInForm.get('email')?.setErrors({ serverError: true });
        // }
      } else {
        this.errorMessage = null;
      }
    });

    // Subscribe to form changes to clear the error message
    this.formChangesSubscription = this.signInForm.valueChanges.subscribe(() => {
      if (this.errorMessage) {
        this.store.dispatch(AuthActions.clearAuthError());
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.errorSubscription?.unsubscribe();
    this.formChangesSubscription?.unsubscribe();
    // Optionally clear error state when component is destroyed
    // this.store.dispatch(AuthActions.clearAuthError());
  }

  onSubmit(): void {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched(); // Mark fields as touched to show validation errors
      return;
    }

    this.errorMessage = null; // Clear previous client-side errors
    const credentials = this.signInForm.value;
    // Remove rememberMe from credentials if it's not part of the API request
    const { rememberMe, ...loginCredentials } = credentials;
    this.store.dispatch(AuthActions.signIn({ credentials: loginCredentials }));

    this.store
      .select(selectIsAuthenticated)
      .pipe(
        filter((isAuthenticated) => isAuthenticated),
        take(1)
      )
      .subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
  }

  // Helper for template validation access
  get email() {
    return this.signInForm.get('email');
  }
  get password() {
    return this.signInForm.get('password');
  }
}
