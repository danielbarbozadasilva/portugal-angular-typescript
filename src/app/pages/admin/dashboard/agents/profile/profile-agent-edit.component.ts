// // filepath: c:\Users\POPULIS\Desktop\VSCODE\ATIVIDADES-TURISTICAS-PORTUGAL\front-end-atividades-turisticas-portugal-angular-typescript\src\app\pages\profile\profile-agent\profile-agent-edit.component.ts
// import { Component, OnInit, inject, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { TranslateModule, TranslateService } from '@ngx-translate/core';
// import { AgentService } from '../../../../core/http/agent.service'; // Ajuste o caminho
// import { Agent } from 'http';
// // Importar validadores específicos se necessário (ex: CNPJ/CPF)
// // import { DocumentValidators } from '../../../shared/validators/document-validators';

// @Component({
//   selector: 'app-profile-agent-edit',
//   standalone: true,
//   imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslateModule],
//   templateUrl: './profile-agent-edit.component.html',
//   // styleUrls: ['./profile-agent-edit.component.css'] // Se houver estilos específicos
// })
// export class ProfileAgentEditComponent implements OnInit {
//   private fb = inject(FormBuilder);
//   private router = inject(Router);
//   private agentService = inject(AgentService);
//   translate = inject(TranslateService);

//   profileForm!: FormGroup;
//   loading = signal<boolean>(true);
//   error = signal<string | null>(null);
//   saving = signal<boolean>(false);
//   successMessage = signal<string | null>(null);
//   currentAgent = signal<Agent | null>(null); // Para exibir dados não editáveis

//   ngOnInit(): void {
//     this.initializeForm();
//     this.loadAgentProfile();
//   }

//   initializeForm(): void {
//     // Similar ao AgentFormComponent, mas alguns campos podem ser desabilitados
//     this.profileForm = this.fb.group({
//       // Campos não editáveis (ou com lógica especial)
//       email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
//       agentType: [{ value: 'person', disabled: true }, Validators.required], // Tipo geralmente não muda
//       // Campos Pessoa Física
//       name: ['', Validators.required],
//       cpf: [''], // Validador condicional
//       // Campos Pessoa Jurídica
//       companyName: [''], // Validador condicional (Razão Social)
//       tradeName: [''], // Validador condicional (Nome Fantasia)
//       cnpj: [''], // Validador condicional
//       // Campos Comuns Editáveis
//       mainPhone: ['', Validators.required], // Adicionar validação de formato de telefone
//       whatsapp: [''], // Opcional, validação de formato
//       specialty: [''], // Campo de especialidade
//       // Endereço (simplificado, pode ser um sub-form)
//       address: this.fb.group({
//         zipCode: [''],
//         street: [''],
//         number: [''],
//         complement: [''],
//         district: [''],
//         city: [''],
//         stateUF: [''],
//       }),
//       // Dados Bancários (simplificado, pode ser sub-form)
//       bankDetails: this.fb.group({
//         bank: [''],
//         bankAgency: [''],
//         bankAccount: [''],
//         accountType: ['checking'], // 'checking' ou 'saving'
//       }),
//     });
//     // Configuração inicial de validadores condicionais baseada no tipo (que virá da API)
//     // Será chamado novamente no populateForm
//   }

//   loadAgentProfile(): void {
//     this.loading.set(true);
//     this.error.set(null);
//     this.successMessage.set(null);

//     this.agentService.getMyProfile().subscribe({
//       next: (agent) => {
//         this.currentAgent.set(agent); // Guarda dados completos
//         this.populateForm(agent);
//         this.loading.set(false);
//       },
//       error: (err) => {
//         console.error('Error loading agent profile:', err);
//         this.error.set(this.translate.instant('errors.profileLoadError') || 'Failed to load profile.');
//         this.loading.set(false);
//       },
//     });
//   }

//   populateForm(agent: Agent): void {
//     // Define o tipo de agente no form (mesmo desabilitado, para validação condicional)
//     this.profileForm.get('agentType')?.setValue(agent.agentType || 'person');
//     // Configura validadores ANTES de popular
//     this.setupConditionalValidators(agent.agentType || 'person');

//     this.profileForm.patchValue({
//       email: agent.email,
//       // Campos PF/PJ
//       name: agent.name,
//       cpf: agent.cpf,
//       companyName: agent.companyName,
//       tradeName: agent.tradeName,
//       cnpj: agent.cnpj,
//       // Campos comuns
//       mainPhone: agent.mainPhone,
//       whatsapp: agent.whatsapp,
//       specialty: agent.specialty,
//       // Subgrupos
//       address: agent.address || {}, // Usa objeto vazio se endereço for null/undefined
//       bankDetails: agent.bankDetails || {}, // Usa objeto vazio se dados bancários forem null/undefined
//     });
//   }

//   // Lógica de validação condicional (igual ao AgentFormComponent)
//   setupConditionalValidators(agentType: string): void {
//     const nameControl = this.profileForm.get('name');
//     const cpfControl = this.profileForm.get('cpf');
//     const companyNameControl = this.profileForm.get('companyName');
//     const tradeNameControl = this.profileForm.get('tradeName');
//     const cnpjControl = this.profileForm.get('cnpj');

//     nameControl?.clearValidators();
//     cpfControl?.clearValidators();
//     companyNameControl?.clearValidators();
//     tradeNameControl?.clearValidators();
//     cnpjControl?.clearValidators();

//     if (agentType === 'person') {
//       nameControl?.setValidators([Validators.required, Validators.minLength(3)]);
//       cpfControl?.setValidators([Validators.required]); // Adicionar validador de CPF
//     } else if (agentType === 'company') {
//       companyNameControl?.setValidators([Validators.required, Validators.minLength(3)]);
//       tradeNameControl?.setValidators([Validators.required, Validators.minLength(3)]);
//       cnpjControl?.setValidators([Validators.required]); // Adicionar validador de CNPJ
//     }

//     nameControl?.updateValueAndValidity();
//     cpfControl?.updateValueAndValidity();
//     companyNameControl?.updateValueAndValidity();
//     tradeNameControl?.updateValueAndValidity();
//     cnpjControl?.updateValueAndValidity();
//   }

//   onSubmit(): void {
//     if (this.profileForm.invalid) {
//       this.profileForm.markAllAsTouched();
//       console.log('Form Invalid:', this.profileForm.errors);
//       // Iterar sobre controles para ver erros específicos
//       Object.keys(this.profileForm.controls).forEach((key) => {
//         const control = this.profileForm.get(key);
//         if (control?.errors) {
//           console.log('Key control: ' + key + ', errors: ' + JSON.stringify(control.errors));
//         }
//         // Verificar subgrupos
//         if (control instanceof FormGroup) {
//           Object.keys(control.controls).forEach((subKey) => {
//             const subControl = control.get(subKey);
//             if (subControl?.errors) {
//               console.log('Sub Key control: ' + key + '.' + subKey + ', errors: ' + JSON.stringify(subControl.errors));
//             }
//           });
//         }
//       });
//       return;
//     }

//     this.saving.set(true);
//     this.error.set(null);
//     this.successMessage.set(null);

//     const formData = this.profileForm.getRawValue(); // Pega todos os valores

//     // Criar objeto apenas com os campos que a API deve atualizar
//     const updateData: Partial<Agent> = {
//       // Campos PF/PJ (enviar apenas os relevantes para o tipo)
//       ...(formData.agentType === 'person' ? { name: formData.name, cpf: formData.cpf } : {}),
//       ...(formData.agentType === 'company'
//         ? { companyName: formData.companyName, tradeName: formData.tradeName, cnpj: formData.cnpj }
//         : {}),
//       // Campos comuns
//       mainPhone: formData.mainPhone,
//       whatsapp: formData.whatsapp,
//       specialty: formData.specialty,
//       // Subgrupos
//       address: formData.address,
//       bankDetails: formData.bankDetails,
//     };

//     // Remover campos nulos ou vazios dos subgrupos se a API não os aceitar
//     // Ex: if (!updateData.address?.street) delete updateData.address.street;

//     this.agentService.updateMyProfile(updateData).subscribe({
//       next: (updatedAgent) => {
//         this.currentAgent.set(updatedAgent); // Atualiza os dados exibidos
//         this.populateForm(updatedAgent); // Repopula o form
//         this.saving.set(false);
//         this.successMessage.set(
//           this.translate.instant('success.profileUpdateSuccess') || 'Profile updated successfully!'
//         );
//         setTimeout(() => this.successMessage.set(null), 3000);
//       },
//       error: (err) => {
//         console.error('Error updating agent profile:', err);
//         const apiError = err?.error?.message || err?.message;
//         const defaultMsg = this.translate.instant('errors.profileUpdateError') || 'Failed to update profile.';
//         this.error.set(apiError || defaultMsg);
//         this.saving.set(false);
//       },
//     });
//   }

//   // Helper para acesso fácil aos controles no template
//   get f() {
//     return this.profileForm.controls;
//   }
//   get fAddress() {
//     return (this.profileForm.get('address') as FormGroup)?.controls;
//   }
//   get fBank() {
//     return (this.profileForm.get('bankDetails') as FormGroup)?.controls;
//   }

//   // Navegar para a página de alteração de senha
//   goToChangePassword(): void {
//     this.router.navigate(['/change-password']);
//   }
// }
