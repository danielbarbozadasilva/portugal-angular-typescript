import { Component, OnInit, OnDestroy, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, tap } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { IAgentData } from '../../core/models/models.agent';
import { IResponseError } from '../../core/models/models.index';
import { AppState } from '../../core/store/reducers-map';
import {
  formatDocByCountry,
  formatPhoneByCountry,
  passwordMatchValidator,
  strongPasswordValidator,
  cpfValidator,
  cnpjValidator,
} from '../../validations/validations-signup';
import { clearAgentError, signUpAgent, signUpAgentSuccess } from '../../core/store/agent/agent.actions';
import { selectAgentLoading, selectAgentError } from '../../core/store/agent/agent.selectors';

@Component({
  standalone: true,
  selector: 'app-signup-agent-component',
  templateUrl: './signup-agent.component.html',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupAgentComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private store = inject<Store<AppState>>(Store);
  private router = inject(Router);
  private actions$ = inject(Actions);
  public translate = inject(TranslateService);
  public signupForm!: FormGroup;
  public loading$: Observable<boolean>;
  public error$: Observable<IResponseError | string | null>;
  public errorMessage = signal<string | null>(null);
  public successMessage = signal<string | null>(null);
  public showPassword = signal(false);
  public showConfirmPassword = signal(false);
  private formChangesSubscription: Subscription | undefined;
  private agentTypeSubscription: Subscription | undefined;
  private errorSubscription: Subscription | undefined;
  private successSubscription: Subscription | undefined;

  // Define initial form data structure matching the form group
  private initialFormData: IAgentData = {
    fullName: '',
    primaryEmail: '',
    password: '',
    confirmPassword: '',
    agentType: 'Pessoa Física',
    cpf: '',
    cnpj: '',
    companyName: '',
    tradeName: '',
    mobilePhone: '',
    whatsapp: '',
    address: {
      zipCode: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      country: '',
    },
    cadastur: '',
    defaultCommission: 0,
    agentStatus: 'Ativo',
    approved: true,
    specialty: '',
    contact: '',
    notes: '',
    bank: '',
    bankAgency: '',
    bankAccount: '',
    accountType: 'Conta Corrente',
    accountHolder: '',
    paymentPreferences: {},
  };

  constructor() {
    this.loading$ = this.store.select(selectAgentLoading);
    this.error$ = this.store.select(selectAgentError);
  }

  ngOnInit(): void {
    this.buildForm();
    this.subscribeToFormChanges();
    this.subscribeToAgentTypeChanges();
    this.subscribeToErrorChanges();
    this.subscribeToSuccessAction(); // Subscribe to success action
  }

  ngOnDestroy(): void {
    this.formChangesSubscription?.unsubscribe();
    this.agentTypeSubscription?.unsubscribe();
    this.errorSubscription?.unsubscribe();
    this.successSubscription?.unsubscribe(); // Unsubscribe from success action
  }

  private buildForm(): void {
    this.signupForm = this.fb.group(
      {
        name: [this.initialFormData.fullName, [Validators.required, Validators.minLength(3)]],
        email: [this.initialFormData.primaryEmail, [Validators.required, Validators.email]],
        password: [this.initialFormData.password, [Validators.required, strongPasswordValidator()]],
        confirmPassword: [this.initialFormData.confirmPassword, [Validators.required]],
        agentType: [this.initialFormData.agentType, [Validators.required]],
        cpf: [this.initialFormData.cpf], // Conditional validator added later
        cnpj: [this.initialFormData.cnpj], // Conditional validator added later
        companyName: [this.initialFormData.companyName], // Conditional validator added later
        tradeName: [this.initialFormData.tradeName],
        country: [this.initialFormData.address.country, [Validators.required]],
        mobilePhone: [this.initialFormData.mobilePhone, [Validators.required]], // Add specific phone validator if needed
        whatsapp: [this.initialFormData.whatsapp], // Add specific phone validator if needed
        address: this.fb.group({
          // Address FormGroup
          zipCode: [this.initialFormData.address.zipCode, [Validators.required]],
          street: [this.initialFormData.address.street, [Validators.required]],
          number: [this.initialFormData.address.number, [Validators.required]],
          complement: [this.initialFormData.address.complement],
          neighborhood: [this.initialFormData.address.neighborhood, [Validators.required]],
          city: [this.initialFormData.address.city, [Validators.required]],
          state: [this.initialFormData.address.state, [Validators.required]],
        }),
        bankDetails: this.fb.group({
          bank: [this.initialFormData.bank],
          bankAgency: [this.initialFormData.bankAgency],
          bankAccount: [this.initialFormData.bankAccount],
          accountType: [this.initialFormData.accountType],
        }),
        // Add other form controls corresponding to IAgentRequest fields
      },
      { validators: passwordMatchValidator('password', 'confirmPassword') } // Use the correct validator function
    );

    // Set initial conditional validators based on default agentType
    this.updateConditionalValidators(this.initialFormData.agentType);
  }

  private subscribeToFormChanges(): void {
    // Clear general error message on form change
    this.formChangesSubscription = this.signupForm.valueChanges
      .pipe(
        debounceTime(300), // Optional: Debounce to avoid rapid clearing
        distinctUntilChanged(), // Optional: Only react if value actually changes
        tap(() => {
          if (this.errorMessage()) {
            this.store.dispatch(clearAgentError()); // Dispatch clear error action
          }
          if (this.successMessage()) {
            this.successMessage.set(null); // Clear success message on interaction
          }
        })
      )
      .subscribe();
  }

  private subscribeToErrorChanges(): void {
    this.errorSubscription = this.error$.subscribe((error) => {
      if (error) {
        const message = typeof error === 'string' ? error : error.message;
        this.errorMessage.set(message || this.translate.instant('signup.errors.generic'));
        this.successMessage.set(null);
        if (error.valueOf() === 'email') this.signupForm.get('email')?.setErrors({ serverError: true });
      } else {
        this.errorMessage.set(null);
      }
    });
  }

  private subscribeToSuccessAction(): void {
    this.successSubscription = this.actions$
      .pipe(
        ofType(signUpAgentSuccess),
        tap(({ agent }) => {
          // Mensagem de sucesso com nome do agente
          this.successMessage.set(this.translate.instant('signup.successMessage', { name: agent.fullName }));
          this.errorMessage.set(null);

          // Reset do formulário
          this.signupForm.reset(this.initialFormData);

          // Redireciona para /signin após 3s
          setTimeout(() => this.router.navigate(['/signin']), 3000);
        })
      )
      .subscribe();
  }

  private subscribeToAgentTypeChanges(): void {
    const agentTypeControl = this.signupForm.get('agentType');
    if (agentTypeControl) {
      this.agentTypeSubscription = agentTypeControl.valueChanges
        .pipe(
          startWith(agentTypeControl.value),
          distinctUntilChanged(),
          tap((agentType: string) => this.updateConditionalValidators(agentType))
        )
        .subscribe();
    }
  }

  private updateConditionalValidators(agentType: string): void {
    const cpfControl = this.signupForm.get('cpf');
    const cnpjControl = this.signupForm.get('cnpj');
    const companyNameControl = this.signupForm.get('companyName');

    // Ensure controls exist before proceeding
    if (!cpfControl || !cnpjControl || !companyNameControl) {
      console.error('Conditional validation controls not found!');
      return;
    }

    // Clear existing validators first
    cpfControl.clearValidators();
    cnpjControl.clearValidators();
    companyNameControl.clearValidators();

    // Set new validators based on agentType
    if (agentType === 'Pessoa Física') {
      cpfControl.setValidators([Validators.required, cpfValidator()]); // Add CPF format validator
      cnpjControl.setValue('', { emitEvent: false }); // Clear other field
      companyNameControl.setValue('', { emitEvent: false }); // Clear other field
    } else if (agentType === 'Pessoa Jurídica') {
      cnpjControl.setValidators([Validators.required, cnpjValidator()]); // Add CNPJ format validator
      companyNameControl.setValidators([Validators.required]);
      cpfControl.setValue('', { emitEvent: false }); // Clear other field
    }

    // Update validity for all related controls
    cpfControl.updateValueAndValidity({ emitEvent: false });
    cnpjControl.updateValueAndValidity({ emitEvent: false });
    companyNameControl.updateValueAndValidity({ emitEvent: false });
  }

  toggleShowPassword(): void {
    this.showPassword.set(!this.showPassword());
  }

  toggleShowConfirmPassword(): void {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  // Apply formatting on blur
  onBlur(fieldName: string, groupName?: string): void {
    const control = groupName ? this.signupForm.get(groupName)?.get(fieldName) : this.signupForm.get(fieldName);
    if (!control || !control.value) return;

    const value = control.value;
    const country = this.signupForm.value.country;
    const agentType = this.signupForm.value.agentType;

    let formattedValue: string | null = null;

    if (fieldName === 'cpf' || fieldName === 'cnpj') {
      formattedValue = formatDocByCountry(value, country, agentType);
    } else if (fieldName === 'mobilePhone' || fieldName === 'whatsapp') {
      formattedValue = formatPhoneByCountry(value, country);
    }

    if (formattedValue !== null && formattedValue !== value) {
      // Use patchValue to update only the specific field, even within a group
      if (groupName) {
        this.signupForm.get(groupName)?.patchValue({ [fieldName]: formattedValue }, { emitEvent: false });
      } else {
        this.signupForm.patchValue({ [fieldName]: formattedValue }, { emitEvent: false });
      }
    }

    // Mark as touched after formatting attempt
    control.markAsTouched();
  }

  onSubmit(): void {
    this.formSubmitted = true; // Indicate form submission attempt
    this.signupForm.markAllAsTouched(); // Mark all fields as touched to show errors

    if (this.signupForm.invalid) {
      console.error('Formulário inválido. Erros:', this.getFormValidationErrors());
      this.focusFirstInvalidField();
      this.errorMessage.set(this.translate.instant('signup.errors.validation')); // Set generic validation error
      return;
    }

    // Clear previous messages before dispatching
    this.errorMessage.set(null);
    this.successMessage.set(null);

    // Prepare data conforming to IAgentRequest, excluding confirmPassword
    const { confirmPassword, ...agentData } = this.signupForm.getRawValue() as typeof this.initialFormData;

    // Ensure nested objects are correctly structured if needed by the API
    const agentPayload: IAgentData = {
      ...agentData,
      // Ensure address and bankDetails are correctly structured if they are separate objects in IAgentRequest
      // If IAgentRequest expects flat structure, flatten agentData here.
    };

    console.log('Dispatching createAgent action with payload:', agentPayload);
    this.store.dispatch(signUpAgent({ agentData: agentPayload })); // Dispatch action to create agent
  }

  // Helper to get all form errors for debugging
  private getFormValidationErrors(): any {
    const errors: any = {};
    Object.keys(this.signupForm.controls).forEach((key) => {
      const control = this.signupForm.get(key);
      if (control instanceof FormGroup) {
        // Recursively get errors from nested form groups
        const groupErrors = this.getNestedFormErrors(control);
        if (Object.keys(groupErrors).length > 0) {
          errors[key] = groupErrors;
        }
      } else if (control?.errors) {
        errors[key] = control.errors;
      }
    });
    // Include form-level errors (like password mismatch)
    if (this.signupForm.errors) {
      errors['formGroup'] = this.signupForm.errors;
    }
    return errors;
  }

  // Recursive helper for nested form groups
  private getNestedFormErrors(formGroup: FormGroup): any {
    const nestedErrors: any = {};
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        const groupErrors = this.getNestedFormErrors(control);
        if (Object.keys(groupErrors).length > 0) {
          nestedErrors[key] = groupErrors;
        }
      } else if (control?.errors) {
        nestedErrors[key] = control.errors;
      }
    });
    return nestedErrors;
  }

  // Helper to focus the first invalid field for better UX
  private focusFirstInvalidField(): void {
    const controls = this.signupForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        // Handle nested controls
        if (controls[name] instanceof FormGroup) {
          const nestedGroup = controls[name] as FormGroup;
          for (const nestedName in nestedGroup.controls) {
            if (nestedGroup.controls[nestedName].invalid) {
              const element = document.querySelector(`[formControlName="${nestedName}"]`);
              if (element instanceof HTMLElement) {
                element.focus();
                return; // Exit after focusing the first invalid nested field
              }
            }
          }
        } else {
          // Handle top-level controls
          const element = document.querySelector(`[formControlName="${name}"]`);
          if (element instanceof HTMLElement) {
            element.focus();
            return; // Exit after focusing the first invalid top-level field
          }
        }
      }
    }
    // Focus form-level element if specific field focus fails (e.g., for cross-field validation)
    const formElement = document.querySelector('form');
    formElement?.focus();
  }

  // Check for errors in template (considers touched/dirty state)
  isInvalid(controlName: string, groupName?: string): boolean {
    const control = this.getControl(controlName, groupName); // Use getControl helper
    return !!control?.invalid && (control.touched || control.dirty || this.formSubmitted);
  }

  // Check if a control has a specific error
  hasError(controlName: string, errorName: string, groupName?: string): boolean {
    const control = this.getControl(controlName, groupName); // Use getControl helper
    return !!control?.hasError(errorName) && (control.touched || control.dirty || this.formSubmitted);
  }

  // Helper to get a form control, potentially nested
  getControl(controlName: string, groupName?: string): AbstractControl | null {
    if (groupName) {
      return this.signupForm.get(groupName)?.get(controlName) ?? null;
    }
    return this.signupForm.get(controlName) ?? null;
  }

  // Get specific error for a control
  getErrorMessage(controlName: string, errorName: string, groupName?: string): string | null {
    const control = this.getControl(controlName, groupName); // Use getControl helper
    if (control?.hasError(errorName) && (control.touched || control.dirty || this.formSubmitted)) {
      // Construct the translation key dynamically
      const baseKey = groupName ? `signup.errors.${groupName}.${controlName}` : `signup.errors.${controlName}`;
      const errorKey = `${baseKey}.${errorName}`;
      const genericKey = `signup.errors.generic`; // Fallback generic error

      // Pass parameters for specific errors like minlength
      const errorParams = {
        requiredLength: control.getError(errorName)?.requiredLength,
      };

      const translatedError = this.translate.instant(errorKey, errorParams);

      // Fallback logic if specific error key is not found
      if (translatedError === errorKey) {
        const genericControlKey = `${baseKey}.invalid`;
        const translatedGenericControl = this.translate.instant(genericControlKey);
        if (translatedGenericControl !== genericControlKey) {
          return translatedGenericControl;
        }
        return this.translate.instant(genericKey); // Use generic fallback
      }
      return translatedError;
    }
    return null;
  }

  private formSubmitted = false;
}
