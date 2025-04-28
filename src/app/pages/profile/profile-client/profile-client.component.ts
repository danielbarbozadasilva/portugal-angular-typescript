import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Tipagens para o Agent
 */
type AgentType = 'Pessoa Física' | 'Pessoa Jurídica';
type AccountType = 'Conta Corrente' | 'Poupança';

export interface IProfileAgent {
    name: string;
    email: string;
    agentType: AgentType;
    companyName?: string;
    tradeName?: string;
    cpf?: string;
    cnpj?: string;
    birthDate?: Date;
    mobilePhone: string;
    whatsapp?: string;
    zipCode: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    bank?: string;
    bankAgency?: string;
    bankAccount?: string;
    accountType?: AccountType;
}

interface TFormErrors {
    [key: string]: string;
}

@Component({
    selector: 'app-profile-agent-edit',
    templateUrl: './profile-agent-edit.component.html',
    styleUrls: ['./profile-agent-edit.component.scss'],
})
export class ProfileAgentEditComponent implements OnInit {
    @Input() loading: boolean = false;

    /**
     * Dados do Agente
     * (poderia ser carregado de um serviço ou Input do componente pai)
     */
    public agent: IProfileAgent = {
        name: '',
        email: '',
        agentType: 'Pessoa Física',
        companyName: '',
        tradeName: '',
        cpf: '',
        cnpj: '',
        birthDate: undefined,
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

    public formErrors: TFormErrors = {};

    constructor(private translate: TranslateService) { }

    ngOnInit(): void {
        // Inicializa validações
        this.validateAllFields();
    }

    /**
     * Chamado no (blur) de cada campo ou no ngOnInit para recalcular as validações.
     */
    onBlur(fieldName: keyof IProfileAgent): void {
        // Se for campo de doc ou fone, formata
        if (fieldName === 'cpf' || fieldName === 'cnpj') {
            this.agent[fieldName] = this.formatDocByCountry(
                this.agent[fieldName] || '',
                this.agent.country,
                this.agent.agentType
            );
        }

        if (fieldName === 'mobilePhone' || fieldName === 'whatsapp') {
            this.agent[fieldName] = this.formatPhoneByCountry(
                this.agent[fieldName] || '',
                this.agent.country
            );
        }

        // atualiza erros
        this.formErrors[fieldName] = this.fieldValidate(fieldName, this.agent[fieldName] || '' as any);
    }

    /**
     * Valida todos os campos
     */
    validateAllFields(): void {
        Object.keys(this.agent).forEach((k) => {
            const key = k as keyof IProfileAgent;
            const value = this.agent[key];
            this.formErrors[key] = this.fieldValidate(key, value || '' as any);
        });
    }

    /**
     * Formata CPF / CNPJ baseado no país e no tipo de agente
     */
    formatDocByCountry(docValue: string, country: string, agentType: string): string {
        // Remove tudo que não for dígito
        let cleanValue = docValue.replace(/\D/g, '');

        if (country.toUpperCase() !== 'BRAZIL') {
            return cleanValue;
        }

        if (agentType === 'Pessoa Física') {
            // 11 dígitos => 123.456.789-00
            if (cleanValue.length === 11) {
                return cleanValue.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
            }
        } else {
            // Pessoa Jurídica (CNPJ)
            // 14 dígitos => 12.345.678/0001-90
            if (cleanValue.length === 14) {
                return cleanValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
            }
        }
        return cleanValue;
    }

    /**
     * Formata telefone de acordo com o país
     */
    formatPhoneByCountry(phone: string, country: string): string {
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

    /**
     * Retorna true se houver campos obrigatórios vazios ou erros de validação
     */
    isNotValid(): boolean {
        // Se existir algum erro, ou algum campo obrigatório vazio
        const hasAnyError = Object.values(this.formErrors).some((err) => err.trim() !== '');
        const requiredFields = [
            this.agent.name,
            this.agent.email,
            this.agent.agentType,
            this.agent.mobilePhone,
            this.agent.zipCode,
            this.agent.street,
            this.agent.number,
            this.agent.neighborhood,
            this.agent.city,
            this.agent.state,
            this.agent.country,
        ];
        const hasEmptyRequired = requiredFields.some((field) => !field || field.trim() === '');
        return hasAnyError || hasEmptyRequired;
    }

    /**
     * Validação individual de campo
     */
    fieldValidate(fieldName: keyof IProfileAgent, value: string): string {
        let msg = '';
        const t = (key: string) => this.translate.instant(key);

        switch (fieldName) {
            case 'name':
                if (/\d/.test(value)) {
                    msg = t('errors.nameNoNumbers') || 'Nome não pode conter números.';
                } else if (!value.trim()) {
                    msg = t('errors.nameBlank') || 'Nome não pode ficar em branco.';
                } else if (value.trim().length < 4) {
                    msg = t('errors.nameMin4') || 'Mínimo de 4 caracteres.';
                } else if (value.trim().length > 50) {
                    msg = t('errors.nameMax50') || 'Máximo de 50 caracteres.';
                }
                break;

            case 'email':
                const regex =
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!value.trim()) {
                    msg = t('errors.emailBlank') || 'E-mail não pode ficar em branco.';
                } else if (!regex.test(value.toLowerCase())) {
                    msg = t('errors.emailInvalid') || 'E-mail inválido.';
                }
                break;

            case 'agentType':
                if (!value) {
                    msg = t('errors.agentTypeEmpty') || 'Tipo de agente não selecionado.';
                }
                break;

            case 'mobilePhone':
                if (!value.trim()) {
                    msg = t('errors.phoneBlank') || 'Telefone principal é obrigatório.';
                } else if (value.replace(/\D/g, '').length < 8) {
                    msg = t('errors.phoneTooShort') || 'Telefone muito curto.';
                }
                break;

            case 'zipCode':
                if (!value.trim()) {
                    msg = t('errors.zipCodeEmpty') || 'CEP vazio.';
                } else if (value.replace(/\D/g, '').length < 4) {
                    msg = t('errors.zipCodeInvalid') || 'CEP inválido.';
                }
                break;

            case 'street':
            case 'number':
            case 'neighborhood':
            case 'city':
            case 'state':
            case 'country':
                if (!value.trim()) {
                    msg = t('errors.fieldRequired') || 'Campo obrigatório.';
                }
                break;

            default:
                break;
        }

        return msg;
    }

    /**
     * Método acionado ao clicar no botão de salvar
     */
    onSubmit(): void {
        if (this.isNotValid()) {
            // Se for inválido, não prosseguir
            return;
        }

        // Aqui disparar a ação real, ex:
        // this.profileService.saveAgent(this.agent).subscribe(...)
        console.log('Salvando o agente =>', this.agent);
    }
}
