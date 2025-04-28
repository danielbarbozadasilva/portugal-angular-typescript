import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  // IAgent, // IAgent might not be needed directly here if only using IAgentRequest
  IAgentRequest,
} from '../../core/models/models.agent';
import { formatDocByCountry, formatPhoneByCountry, isNotValid } from '../../validations/validations-signup';
import { Store } from '@ngrx/store'; // Import Store
import * as AgentActions from '../../core/store/agent/agent.actions'; // Import Agent Actions

@Component({
  selector: 'app-signup-agent',
  templateUrl: './signup-agent-component.html', // Corrected path
  styleUrls: ['./signup-agent.component.css'], // Corrected path if it exists, or remove/change extension
})
export class SignupAgentComponent implements OnInit {
  public signupForm!: FormGroup;
  public loading = false; // simulando loading
  public showPassword = false;
  public showConfirmPassword = false;

  // Exemplo com defaults
  public initialFormData: IAgentRequest = {
    id: '', // id might not be needed for creation request
    name: '',
    email: '',
    password: '', // Keep password fields for the request model
    confirmPassword: '', // Keep password fields for the request model
    agentType: 'Pessoa Física',
    companyName: '',
    tradeName: '',
    cpf: '',
    cnpj: '',
    birthDate: new Date(), // Ensure birthDate is initialized correctly if needed by IAgentRequest
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
    private store: Store // Inject Store
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.signupForm = this.fb.group({
      name: [this.initialFormData.name, [Validators.required]],
      email: [this.initialFormData.email, [Validators.required, Validators.email]],
      password: [this.initialFormData.password, [Validators.required]], // Use initialFormData.password
      confirmPassword: [this.initialFormData.confirmPassword, [Validators.required]], // Use initialFormData.confirmPassword
      agentType: [this.initialFormData.agentType, [Validators.required]],
      // ... rest of the form controls ...
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

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onBlur(fieldName: string) {
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
    // Mark all fields as touched to display validation errors
    this.signupForm.markAllAsTouched();

    if (this.signupForm.invalid || isNotValid(this.signupForm.value)) {
      console.error('Form is invalid:', this.signupForm.errors);
      // Optionally iterate through controls to find specific errors
      Object.keys(this.signupForm.controls).forEach((key) => {
        const controlErrors = this.signupForm.get(key)?.errors;
        if (controlErrors != null) {
          console.error('Key = ' + key + ', errors = ' + JSON.stringify(controlErrors));
        }
      });
      return;
    }

    this.loading = true; // Start loading indicator

    // Use IAgentRequest for the data type
    const agentData: IAgentRequest = this.signupForm.value;

    // Dispatch the createAgent action
    this.store.dispatch(AgentActions.createAgent({ agent: agentData }));

    // Handle success/failure (e.g., subscribe to relevant selectors or listen for actions)
    // For simplicity, just log here. In a real app, navigate or show messages.
    console.log('Form submitted, dispatching createAgent action:', agentData);

    // Reset loading state - ideally based on success/failure actions
    // setTimeout(() => this.loading = false, 1000); // Simulate async operation end
  }
}
