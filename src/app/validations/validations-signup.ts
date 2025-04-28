import { IAgentRequest } from 'app/core/models/models.agent'; // Changed import

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

export function isNotValid(agent: IAgentRequest, formErrors?: any): boolean {
  // Changed type to IAgentRequest
  // Checar se tem algum erro
  // ou se algum campo é obrigatório e está vazio.
  // Exemplo simplificado:
  if (!agent.name || !agent.email || !agent.password) {
    // Check fields from IAgentRequest
    return true;
  }
  if (formErrors) {
    // Se houver chaves de erro
    return !!Object.keys(formErrors).length;
  }
  return false;
}
