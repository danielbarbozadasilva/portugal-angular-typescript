import { Component, OnInit, OnDestroy, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import { RouterModule } from '@angular/router';

import { signUpClient, signUpClientSuccess } from '../../core/store/client/client.actions';
import { selectClientError, selectClientLoading } from '../../core/store/client/client.selectors';
import { IResponseError } from '../../core/models/models.index';
import { AppState } from '../../core/store/reducers-map';
import { strongPasswordValidator, passwordMatchValidator } from '../../validations/validations-signup';

// Tipos e interfaces
export type DocumentType = 'RG' | 'CPF' | 'Passaporte' | 'Cédula de Identidade' | 'Outro';

export interface IAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood?: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface IBankDetails {
  bank: string;
  bankAgency: string;
  bankAccount: string;
  accountType: string;
}

export interface IClient {
  _id?: string;
  user?: string; // ID do usuário
  name: string;
  birthDate?: string;
  country?: string;
  documentType?: string; // Ex: 'CPF'
  documentValue?: string; // Ex: '000.000.000-00'
  phones?: string[]; // array de telefones se aplicável
  address: IAddress;
  cpf?: string;
  cnpj?: string;
  companyName?: string;
  phone?: string;
  mobilePhone?: string;
  whatsapp?: string;
  agentType?: string; // 'pessoa_fisica' ou 'pessoa_juridica'
  bankDetails?: IBankDetails;
  deleted?: boolean;
  paymentMethods?: string[];
  interests?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

@Component({
  selector: 'app-signup-client-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, RouterModule],
  templateUrl: './signup-client.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpClientComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private store = inject<Store<AppState>>(Store);
  private actions$ = inject(Actions);
  public translate = inject(TranslateService);

  // Formulário de cadastro (usando tipagem mais robusta)
  signupForm!: FormGroup;

  // Observables de estado do NGRX
  loading$: Observable<boolean>;
  error$: Observable<IResponseError | string | null>;

  // Sinais para mensagens e estado da UI
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  showPassword = signal<boolean>(false);
  showConfirmPassword = signal<boolean>(false);

  // Subscriptions
  private errorSubscription?: Subscription;
  private successSubscription?: Subscription;
  private formChangesSubscription?: Subscription;

  // Flag para controlar submissão
  private formSubmitted = false;

  // Dados iniciais para reset do formulário
  private initialFormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agentType: '',
    cpf: '',
    cnpj: '',
    companyName: '',
    phone: '',
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
      country: 'Brasil',
    },
    bankDetails: {
      bank: '',
      bankAgency: '',
      bankAccount: '',
      accountType: 'Conta Corrente',
    },
    termsAccepted: false,
  };

  constructor() {
    // Seletores de estado
    this.loading$ = this.store.select(selectClientLoading);
    this.error$ = this.store.select(selectClientError);
  }

  ngOnInit(): void {
    this.buildForm();
    this.subscribeToErrorChanges();
    this.subscribeToSuccessAction();
    this.subscribeToFormChanges();
  }

  ngOnDestroy(): void {
    this.errorSubscription?.unsubscribe();
    this.successSubscription?.unsubscribe();
    this.formChangesSubscription?.unsubscribe();
  }

  // Cria a estrutura do formulário
  private buildForm(): void {
    this.signupForm = this.fb.group(
      {
        name: [this.initialFormData.name, [Validators.required, Validators.minLength(3)]],
        email: [this.initialFormData.email, [Validators.required, Validators.email]],
        password: [this.initialFormData.password, [Validators.required, strongPasswordValidator()]],
        confirmPassword: [this.initialFormData.confirmPassword, [Validators.required]],
        agentType: [this.initialFormData.agentType, [Validators.required]],
        cpf: [this.initialFormData.cpf],
        cnpj: [this.initialFormData.cnpj],
        companyName: [this.initialFormData.companyName],
        phone: [this.initialFormData.phone, [Validators.required]],
        mobilePhone: [this.initialFormData.mobilePhone, [Validators.required]],
        whatsapp: [this.initialFormData.whatsapp],
        address: this.fb.group({
          zipCode: [this.initialFormData.address.zipCode, [Validators.required]],
          street: [this.initialFormData.address.street, [Validators.required]],
          number: [this.initialFormData.address.number, [Validators.required]],
          complement: [this.initialFormData.address.complement],
          neighborhood: [this.initialFormData.address.neighborhood, [Validators.required]],
          city: [this.initialFormData.address.city, [Validators.required]],
          state: [this.initialFormData.address.state, [Validators.required]],
          country: [this.initialFormData.address.country, [Validators.required]],
        }),
        bankDetails: this.fb.group({
          bank: [this.initialFormData.bankDetails.bank],
          bankAgency: [this.initialFormData.bankDetails.bankAgency],
          bankAccount: [this.initialFormData.bankDetails.bankAccount],
          accountType: [this.initialFormData.bankDetails.accountType],
        }),
        termsAccepted: [this.initialFormData.termsAccepted, [Validators.requiredTrue]],
      },
      {
        validators: passwordMatchValidator('password', 'confirmPassword'),
      }
    );
  }

  // Subscrição para tratar erros do NGRX
  private subscribeToErrorChanges(): void {
    this.errorSubscription = this.error$.subscribe((error) => {
      if (error) {
        const message = typeof error === 'string' ? error : error.message;
        this.errorMessage.set(message || this.translate.instant('signup.errors.generic'));
        this.successMessage.set(null); // limpa mensagem de sucesso
      } else {
        this.errorMessage.set(null);
      }
    });
  }

  // Subscrição para tratar sucesso do NGRX
  private subscribeToSuccessAction(): void {
    this.successSubscription = this.actions$
      .pipe(
        ofType(signUpClientSuccess),
        tap(({ client }) => {
          this.successMessage.set(
            this.translate.instant('signup.successMessage', {
              name: client.name,
            })
          );
          this.errorMessage.set(null);
          this.formSubmitted = false;
          this.signupForm.reset(this.initialFormData); // reset do form
          // Exemplo de navegação após delay:
          // setTimeout(() => this.router.navigate(['/signIn']), 3000);
        })
      )
      .subscribe();
  }

  // Subscrição para mudanças no formulário
  private subscribeToFormChanges(): void {
    this.formChangesSubscription = this.signupForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          // Se houver mensagem de erro em tela, pode-se limpar ao digitar
          if (this.errorMessage()) {
            // Se tiver uma action de limpar, pode despachá-la
            // this.store.dispatch(clearClientError());
            this.errorMessage.set(null);
          }
          // Limpa mensagem de sucesso ao modificar o formulário
          if (this.successMessage()) {
            this.successMessage.set(null);
          }
        })
      )
      .subscribe();
  }

  // Alterna exibição da senha
  toggleShowPassword(): void {
    this.showPassword.set(!this.showPassword());
  }

  // Alterna exibição da confirmação de senha
  toggleShowConfirmPassword(): void {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  // Método de envio do formulário
  onSubmit(): void {
    this.formSubmitted = true;
    this.signupForm.markAllAsTouched();

    if (this.signupForm.invalid) {
      console.error('Formulário inválido. Erros:', this.getFormValidationErrors());
      this.focusFirstInvalidField();
      this.errorMessage.set(this.translate.instant('signup.errors.validation'));
      return;
    }

    this.errorMessage.set(null);
    this.successMessage.set(null);

    // Obtém os valores do formulário
    const { confirmPassword, ...payload } = this.signupForm.getRawValue() as IClient & { confirmPassword: string };

    // Despacha a action para criar cliente no NGRX
    this.store.dispatch(signUpClient({ data: payload } as any));
  }

  // Validação: retorna true se o campo estiver inválido
  isInvalid(controlName: string, groupName?: string): boolean {
    const control = groupName ? this.signupForm.get(groupName)?.get(controlName) : this.signupForm.get(controlName);

    return !!control?.invalid && (control.touched || control.dirty || this.formSubmitted);
  }

  // Verifica erro específico
  hasError(controlName: string, errorName: string, groupName?: string): boolean {
    const control = groupName ? this.signupForm.get(groupName)?.get(controlName) : this.signupForm.get(controlName);
    return !!control?.hasError(errorName);
  }

  // Exemplo de onBlur (ilustrativo)
  onBlur(controlName: string, groupName?: string): void {
    const control = groupName ? this.signupForm.get(groupName)?.get(controlName) : this.signupForm.get(controlName);
    control?.markAsTouched();
  }

  // Foca o primeiro campo inválido
  private focusFirstInvalidField(): void {
    const controls = this.signupForm.controls;
    for (const name of Object.keys(controls)) {
      const control = controls[name];
      // Se o controle for um FormGroup
      if (control instanceof FormGroup) {
        const groupControls = control.controls;
        for (const nestedName of Object.keys(groupControls)) {
          if (groupControls[nestedName].invalid) {
            const element = document.querySelector(`[formControlName="${nestedName}"]`);
            if (element instanceof HTMLElement) {
              element.focus();
              return;
            }
          }
        }
      }
      // Se o controle for um formControl simples
      else if (control instanceof FormControl && control.invalid) {
        const element = document.querySelector(`[formControlName="${name}"]`);
        if (element instanceof HTMLElement) {
          element.focus();
          return;
        }
      }
      // Se for um FormArray, pode aplicar lógica semelhante
    }
    // Foco de fallback
    const formElement = document.querySelector('form');
    formElement?.focus();
  }

  // Obtém todos os erros do formulário para debug
  private getFormValidationErrors(): any {
    const errors: any = {};
    const form = this.signupForm;

    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      if (control instanceof FormGroup) {
        const groupErrors = this.getNestedFormErrors(control);
        if (Object.keys(groupErrors).length > 0) {
          errors[key] = groupErrors;
        }
      } else if (control instanceof FormArray) {
        const arrayErrors: any[] = [];
        control.controls.forEach((itemControl, index) => {
          if (itemControl.errors) {
            arrayErrors[index] = itemControl.errors;
          }
        });
        if (arrayErrors.length > 0) {
          errors[key] = arrayErrors;
        }
      } else if (control?.errors) {
        errors[key] = control.errors;
      }
    });

    if (form.errors) {
      errors['formGroup'] = form.errors;
    }
    return errors;
  }

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
}
