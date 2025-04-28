// src/app/sign-up/sign-up-client.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Estrutura do objeto 'IClient' conforme no React
 */
export interface IClient {
  username: string;
  name: string;
  birthDate: Date;
  country: string;
  documentType: string;
  documentValue: string;
  phones: string[];
  email: string;
  password: string;
  confirmPassword: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
  };
  interests: string[];
}

@Component({
  standalone: true, // Adicionar standalone
  selector: 'app-signup-client',
  templateUrl: './signup-client.component.html',
  imports: [
    // Adicionar imports necessários
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class SignUpClientComponent implements OnInit {
  @Input() loading = false; // similar ao state.auth.loading do React
  /**
   * Exponha um evento de submit (equivalente ao `submit: any` no React).
   * O pai do componente pode receber o objeto IClient e disparar a lógica necessária.
   */
  @Output() submitClient = new EventEmitter<IClient>();

  signUpForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  // Lista de chaves de interesses (substitui interestKeys no React)
  interestKeys = ['tourWalk', 'tourExcursion', 'tourEvent', 'tourTrail', 'tourOther'];

  constructor(private fb: FormBuilder) {
    // Define o idioma padrão, se desejar
    // this.translate.use('en-US');
  }

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Inicializa o FormGroup com todos os campos e validações.
   */
  private initForm(): void {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      name: ['', []],
      email: ['', []],
      birthDate: ['', []],
      country: ['', []],
      documentType: [''],
      documentValue: [''],
      phones: this.fb.array([
        [''], // phones[0]
        [''], // phones[1]
      ]),
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        street: [''],
        number: [''],
        complement: [''],
        district: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      interests: [[]], // array de strings
    });

    // Adiciona as validações customizadas, pois precisamos validar vários campos
    this.addCustomValidators();
  }

  /**
   * Validações customizadas que replicam a lógica do React.
   */
  private addCustomValidators(): void {
    // Name
    this.signUpForm
      .get('name')
      ?.setValidators([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        this.noNumbersValidator.bind(this),
      ]);

    // Email
    this.signUpForm.get('email')?.setValidators([Validators.required, Validators.email]);

    // Data de Nascimento
    this.signUpForm.get('birthDate')?.setValidators([Validators.required, this.birthDateValidator.bind(this)]);

    // Country
    this.signUpForm.get('country')?.setValidators([Validators.required]);

    // Document Value
    this.signUpForm.get('documentValue')?.setValidators([Validators.required, this.documentValidator.bind(this)]);

    // Telefone principal (phones[0])
    const phonesFormArray = this.signUpForm.get('phones') as FormArray;
    phonesFormArray.controls[0].setValidators([Validators.required, this.phoneValidator.bind(this)]);
    // Telefone opcional (phones[1]) => se preenchido, validamos
    phonesFormArray.controls[1].setValidators([this.optionalPhoneValidator.bind(this)]);

    // Endereço (campos obrigatórios)
    const addressGroup = this.signUpForm.get('address');
    addressGroup?.get('street')?.setValidators([Validators.required]);
    addressGroup?.get('number')?.setValidators([Validators.required]);
    addressGroup?.get('district')?.setValidators([Validators.required]);
    addressGroup?.get('city')?.setValidators([Validators.required]);
    addressGroup?.get('state')?.setValidators([Validators.required]);
    addressGroup?.get('zipCode')?.setValidators([Validators.required]);

    // Senha e Confirmar Senha
    this.signUpForm
      .get('password')
      ?.setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(50)]);
    this.signUpForm
      .get('confirmPassword')
      ?.setValidators([Validators.required, this.matchOtherValidator('password').bind(this)]);
  }

  /**
   * Validator: impede números no nome.
   */
  private noNumbersValidator(control: any) {
    const value = (control.value || '').trim();
    if (/\d/.test(value)) {
      return { nameNoNumbers: true };
    }
    return null;
  }

  /**
   * Validator: data de nascimento (não pode ser futura e >= 18 anos).
   */
  private birthDateValidator(control: any) {
    const value = control.value;
    if (!value) return { birthDateBlank: true };

    const today = moment().startOf('day');
    const dateBirth = moment(value, 'YYYY-MM-DD', true);

    if (!dateBirth.isValid()) {
      return { birthDateInvalid: true };
    }
    if (dateBirth.isAfter(today)) {
      return { birthDateFuture: true };
    }
    // menor de 18?
    const diffYears = today.diff(dateBirth, 'years');
    if (diffYears < 18) {
      return { birthDateUnder18: true };
    }
    return null;
  }

  /**
   * Validator: CPF se documentType === 'CPF' (tem que ter 11 dígitos).
   */
  private documentValidator(control: any) {
    const docValue = (control.value || '').replace(/\D/g, '');
    if (!docValue) return { documentBlank: true };

    const docType = this.signUpForm?.get('documentType')?.value;
    if (docType === 'CPF' && docValue.length !== 11) {
      return { cpfInvalid: true };
    }
    return null;
  }

  /**
   * Validator: phone principal => entre 8 e 15 dígitos.
   */
  private phoneValidator(control: any) {
    const phoneRaw = (control.value || '').replace(/\D/g, '');
    if (phoneRaw.length < 8 || phoneRaw.length > 15) {
      return { phoneInvalidRange: true };
    }
    return null;
  }

  /**
   * Validator: se preenchido o telefone opcional => deve ser 8 a 15 dígitos.
   */
  private optionalPhoneValidator(control: any) {
    const phoneRaw = (control.value || '').replace(/\D/g, '');
    if (phoneRaw && (phoneRaw.length < 8 || phoneRaw.length > 15)) {
      return { phoneInvalidRange: true };
    }
    return null;
  }

  /**
   * Validator: confirmPassword deve coincidir com password
   */
  private matchOtherValidator(otherControlName: string) {
    return (control: any) => {
      if (!control || !control.parent) return null;
      const otherValue = control.parent.get(otherControlName)?.value;
      if (control.value !== otherValue) {
        return { passwordsNoMatch: true };
      }
      return null;
    };
  }

  /**
   * Formata o documento se for CPF (exemplo: 111.222.333-44).
   */
  formatDocumentValue(): void {
    const docType = this.signUpForm.get('documentType')?.value;
    let docValue = this.signUpForm.get('documentValue')?.value || '';

    if (docType === 'CPF') {
      docValue = docValue
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
      this.signUpForm.get('documentValue')?.setValue(docValue, { emitEvent: false });
    }
  }

  /**
   * Formata telefone removendo caracteres não numéricos.
   */
  formatPhoneByCountry(index: number): void {
    const phonesFormArray = this.signUpForm.get('phones') as FormArray;
    const original = phonesFormArray.at(index)?.value || '';
    const digitsOnly = original.replace(/\D/g, '');
    phonesFormArray.at(index)?.setValue(digitsOnly, { emitEvent: false });
  }

  /**
   * Lida com a (des)marcação de interesses, armazenando-os em um array de string.
   */
  toggleInterest(interest: string): void {
    const currentInterests: string[] = this.signUpForm.get('interests')?.value || [];
    const alreadySelected = currentInterests.includes(interest);
    if (alreadySelected) {
      this.signUpForm.get('interests')?.setValue(currentInterests.filter((i) => i !== interest));
    } else {
      this.signUpForm.get('interests')?.setValue([...currentInterests, interest]);
    }
  }

  /**
   * Verifica se o formulário é inválido (similar ao isNotValid do React).
   */
  isFormInvalid(): boolean {
    return this.signUpForm.invalid;
  }

  /**
   * Chama o eventEmitter passando o IClient preenchido.
   */
  onSubmit(): void {
    if (this.isFormInvalid()) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    // Monta objeto IClient no mesmo formato do React
    const formValue = this.signUpForm.value;
    const newClient: IClient = {
      username: formValue.username,
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      confirmPassword: formValue.confirmPassword,
      birthDate: formValue.birthDate ? new Date(formValue.birthDate) : new Date(),
      country: formValue.country,
      documentType: formValue.documentType,
      documentValue: formValue.documentValue,
      phones: formValue.phones || ['', ''],
      address: {
        street: formValue.address.street,
        number: formValue.address.number,
        complement: formValue.address.complement,
        district: formValue.address.district,
        city: formValue.address.city,
        state: formValue.address.state,
        zipCode: formValue.address.zipCode,
      },
      interests: formValue.interests,
    };

    // Dispara o evento para o componente pai
    this.submitClient.emit(newClient);
  }
}
