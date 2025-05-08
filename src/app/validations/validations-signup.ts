import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cpf = control.value;
    if (!cpf) {
      return null; // Não valida se vazio (usar Validators.required para isso)
    }
    // Regex simples para formato XXX.XXX.XXX-XX
    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfPattern.test(cpf) ? null : { cpfInvalid: true };
  };
}

// Validador simples para CNPJ (apenas formato básico) - MELHORAR com lógica real
export function cnpjValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cnpj = control.value;
    if (!cnpj) {
      return null; // Não valida se vazio
    }
    // Regex simples para formato XX.XXX.XXX/XXXX-XX
    const cnpjPattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    return cnpjPattern.test(cnpj) ? null : { cnpjInvalid: true };
  };
}

// Validador para verificar se as senhas coincidem
export function passwordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    // Verifica se o controle passado é realmente um FormGroup
    if (!(formGroup instanceof FormGroup)) {
      console.error('passwordMatchValidator must be applied to a FormGroup.');
      return null;
    }

    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (!control || !matchingControl) {
      console.error(`Form controls not found: ${controlName}, ${matchingControlName}`);
      return null; // Retorna nulo se os controles não existirem para evitar erros
    }

    // Define o erro no controle de confirmação se as senhas não coincidirem
    if (matchingControl.errors && !matchingControl.errors['passwordMismatch']) {
      // Retorna nulo se já houver outro erro (exceto o nosso)
      return null;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ ...matchingControl.errors, passwordMismatch: true });
      return { passwordMismatch: true }; // Retorna o erro no nível do FormGroup também, se necessário
    } else {
      // Limpa o erro específico se as senhas coincidirem
      const errors = { ...matchingControl.errors };
      delete errors['passwordMismatch'];
      // Define como null se não houver mais erros, ou mantém os outros erros
      matchingControl.setErrors(Object.keys(errors).length === 0 ? null : errors);
      return null;
    }
  };
}

// Outras validações podem ser adicionadas aqui...
// Exemplo: Validador de força de senha
export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
    const isLongEnough = value.length >= 8;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && isLongEnough;

    return !passwordValid ? { strongPassword: true } : null;
  };
}

// Exemplo fictício; adapte conforme suas regras
export function fieldValidate(key: string, value: string): string | null {
  // Lógica de validação. Exemplo:
  if (key === 'name' && !value) {
    return 'Nome é obrigatório'; // ou use i18n
  }
  return null;
}

export function formatDocByCountry(value: string, country: string, agentType: string): string {
  // Formatar CPF/CNPJ etc.
  // Exemplo simulado:
  if (country === 'Brazil' && agentType === 'Pessoa Física') {
    // formata CPF
    // ...
    return value;
  }
  return value;
}

/**
 * Formata telefone de acordo com o país
 */
export function formatPhoneByCountry(phone: string, country: string): string {
  let raw = phone.replace(/\D/g, '');

  switch (country.toUpperCase()) {
    case 'BRAZIL':
    case 'BR':
      if (raw.length === 11) {
        return raw.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (raw.length === 10) {
        return raw.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
      }
      return raw;

    case 'PORTUGAL':
    case 'PT':
      if (raw.length === 9) {
        return raw.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3');
      }
      return raw;

    case 'FRANCE':
    case 'FR':
      if (raw.length === 10) {
        return raw.replace(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5');
      }
      return raw;

    case 'SPAIN':
    case 'ES':
      if (raw.length === 9) {
        return raw.replace(/^(\d{3})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4');
      }
      return raw;

    case 'UNITED STATES':
    case 'US':
      if (raw.length === 10) {
        return raw.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
      }
      return raw;

    case 'ENGLAND':
    case 'UK':
    case 'UNITED KINGDOM':
      if (raw.length === 10) {
        return raw.replace(/^(\d{4})(\d{3})(\d{3})$/, '($1) $2-$3');
      } else if (raw.length === 11) {
        return raw.replace(/^(\d{5})(\d{3})(\d{3})$/, '($1) $2-$3');
      }
      return raw;

    default:
      return raw;
  }
}
