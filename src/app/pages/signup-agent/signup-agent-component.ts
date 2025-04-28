import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

/* Modelos, validações e Store */
import { IAgentRequest } from '../../core/models/models.agent';
import { formatDocByCountry, formatPhoneByCountry, isNotValid } from '../../validations/validations-signup';
import { Store } from '@ngrx/store';
import * as AgentActions from '../../core/store/agent/agent.actions';

@Component({
  // Diz ao Angular que este é um componente standalone
  standalone: true,
  selector: 'app-signup-agent',
  templateUrl: './signup-agent-component.html',
  styleUrls: ['./signup-agent.component.css'],

  // Importa os módulos necessários para pipes e forms
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule, // Necessário para o pipe 'translate'
  ],
})
export class SignupAgentComponent implements OnInit {
  public signupForm!: FormGroup;
  public loading = false;
  public showPassword = false;
  public showConfirmPassword = false;

  public initialFormData: IAgentRequest = {
    id: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agentType: 'Pessoa Física',
    companyName: '',
    tradeName: '',
    cpf: '',
    cnpj: '',
    birthDate: new Date(),
    mobilePhone: '',
    whatsapp: '',
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    country: 'Portugal',
    bank: '',
    bankAgency: '',
    bankAccount: '',
    accountType: 'Conta Corrente',
  };

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.signupForm = this.fb.group({
      name: [this.initialFormData.name, [Validators.required]],
      email: [this.initialFormData.email, [Validators.required, Validators.email]],
      password: [this.initialFormData.password, [Validators.required]],
      confirmPassword: [this.initialFormData.confirmPassword, [Validators.required]],
      agentType: [this.initialFormData.agentType, [Validators.required]],
      cpf: [this.initialFormData.cpf],
      cnpj: [this.initialFormData.cnpj],
      companyName: [this.initialFormData.companyName],
      tradeName: [this.initialFormData.tradeName],
      country: [this.initialFormData.country, [Validators.required]],
      mobilePhone: [this.initialFormData.mobilePhone, [Validators.required]],
      whatsapp: [this.initialFormData.whatsapp],
      zipCode: [this.initialFormData.zipCode, [Validators.required]],
      street: [this.initialFormData.street, [Validators.required]],
      number: [this.initialFormData.number, [Validators.required]],
      complement: [this.initialFormData.complement],
      neighborhood: [this.initialFormData.neighborhood, [Validators.required]],
      city: [this.initialFormData.city, [Validators.required]],
      state: [this.initialFormData.state, [Validators.required]],
      bank: [this.initialFormData.bank],
      bankAgency: [this.initialFormData.bankAgency],
      bankAccount: [this.initialFormData.bankAccount],
      accountType: [this.initialFormData.accountType],
    });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
  toggleShowConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onBlur(fieldName: string): void {
    const value = this.signupForm.controls[fieldName].value;
    const country = this.signupForm.value.country;
    const agentType = this.signupForm.value.agentType;

    if (fieldName === 'cpf' || fieldName === 'cnpj') {
      const formatted = formatDocByCountry(value, country, agentType);
      this.signupForm.patchValue({ [fieldName]: formatted });
    }
    if (fieldName === 'mobilePhone' || fieldName === 'whatsapp') {
      const formatted = formatPhoneByCountry(value, country);
      this.signupForm.patchValue({ [fieldName]: formatted });
    }
  }

  submitForm(): void {
    this.signupForm.markAllAsTouched();
    if (this.signupForm.invalid || isNotValid(this.signupForm.value)) {
      console.error('Form is invalid:', this.signupForm.errors);
      // Debug de erros
      Object.keys(this.signupForm.controls).forEach((key) => {
        const controlErrors = this.signupForm.get(key)?.errors;
        if (controlErrors) {
          console.error('Key = ' + key + ', errors = ' + JSON.stringify(controlErrors));
        }
      });
      return;
    }

    this.loading = true;
    const agentData: IAgentRequest = this.signupForm.value;
    this.store.dispatch(AgentActions.createAgent({ agent: agentData }));
    console.log('Form submitted, dispatching createAgent action:', agentData);

    // Exemplo de simulação de fim de loading; substitua por listening a actions do NgRx
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
