// // filepath: c:\Users\POPULIS\Desktop\VSCODE\ATIVIDADES-TURISTICAS-PORTUGAL\front-end-atividades-turisticas-portugal-angular-typescript\src\app\pages\profile\profile-client\profile-client.component.ts
// import { Component, OnInit, inject, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router'; // Import RouterModule
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { TranslateModule, TranslateService } from '@ngx-translate/core';
// import { UserService } from '../../../core/http/user.service'; // Ajuste o caminho
// import { AuthService } from '../../../core/authentication/auth.service'; // Ajuste o caminho
// import { IUser } from '../../../core/models/models.user'; // Ajuste o caminho
// // Importar validadores customizados se necessário
// // import { CustomValidators } from '../../../shared/validators/custom-validators';

// @Component({
//   selector: 'app-profile-client',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterModule, // Adicionar RouterModule
//     ReactiveFormsModule,
//     TranslateModule
//   ],
//   templateUrl: './profile-client.component.html',
//   // styleUrls: ['./profile-client.component.css']
// })
// export class ProfileClientComponent implements OnInit {
//   private fb = inject(FormBuilder);
//   private router = inject(Router);
//   private userService = inject(UserService);
//   private authService = inject(AuthService); // Injetar AuthService
//   translate = inject(TranslateService);

//   profileForm!: FormGroup;
//   loading = signal<boolean>(true);
//   error = signal<string | null>(null);
//   saving = signal<boolean>(false);
//   successMessage = signal<string | null>(null);
//   currentUser = signal<IUser | null>(null); // Para exibir dados não editáveis

//   ngOnInit(): void {
//     this.initializeForm();
//     this.loadUserProfile();
//   }

//   initializeForm(): void {
//     // Incluir campos que o cliente pode editar
//     this.profileForm = this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(3)]],
//       // Email geralmente não é editável ou requer confirmação
//       email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
//       // Username pode ou não ser editável
//       username: [{ value: '', disabled: true }, [Validators.required]],
//       birthDate: [null], // Usar formato 'yyyy-MM-dd' para input date
//       // Adicionar outros campos editáveis: telefone, endereço, interesses, etc.
//       mainPhone: [''],
//       // Exemplo endereço (simplificado)
//       address: this.fb.group({
//          street: [''],
//          city: [''],
//          zipCode: [''],
//          country: [''] // Pode ser um select
//       })
//     });
//   }

//   loadUserProfile(): void {
//     this.loading.set(true);
//     this.error.set(null);
//     this.successMessage.set(null);

//     this.userService.getUserById().subscribe({
//       next: (user) => {
//         this.currentUser.set(user); // Guarda dados completos
//         this.populateForm(user);
//         this.loading.set(false);
//       },
//       error: (err) => {
//         console.error('Error loading user profile:', err);
//         this.error.set(this.translate.instant('errors.profileLoadError') || 'Failed to load profile.');
//         this.loading.set(false);
//       }
//     });
//   }

//   populateForm(user: IUser): void {
//     this.profileForm.patchValue({
//       name: user.name,
//       email: user.email,
//       username: user.username,

//       })
//   }

//    // Helper para formatar Date para 'yyyy-MM-dd' (igual ao ActivityForm)
//   private formatDateForInput(date: string | Date | undefined | null): string | null {
//     if (!date) return null;
//     try {
//       const d = new Date(date);
//       const year = d.getFullYear();
//       const month = (d.getMonth() + 1).toString().padStart(2, '0');
//       const day = d.getDate().toString().padStart(2, '0');
//       return `${year}-${month}-${day}`;
//     } catch (e) {
//       console.error("Error formatting date:", date, e);
//       return null;
//     }
//   }

//   onSubmit(): void {
//     if (this.profileForm.invalid) {
//       this.profileForm.markAllAsTouched();
//       return;
//     }

//     this.saving.set(true);
//     this.error.set(null);
//     this.successMessage.set(null);

//     const formData = this.profileForm.getRawValue(); // Pega todos os valores, incluindo desabilitados

//     // Enviar apenas os campos que podem ser atualizados pela API
//     const updateData: Partial<IUser> = {
//       name: formData.name,
//       // Mapear outros campos editáveis
//     };


//     this.userService.updateUser(updateData._id!, updateData).subscribe({
//       next: (updatedUser) => {
//         this.currentUser.set(updatedUser); // Atualiza os dados exibidos
//         this.populateForm(updatedUser); // Repopula o form com dados atualizados (opcional)
//         this.saving.set(false);
//         this.successMessage.set(this.translate.instant('success.profileUpdateSuccess') || 'Profile updated successfully!');
//         // Limpar mensagem de sucesso após alguns segundos
//         setTimeout(() => this.successMessage.set(null), 3000);
//       },
//       error: (err) => {
//         console.error('Error updating profile:', err);
//         const apiError = err?.error?.message || err?.message;
//         const defaultMsg = this.translate.instant('errors.profileUpdateError') || 'Failed to update profile.';
//         this.error.set(apiError || defaultMsg);
//         this.saving.set(false);
//       }
//     });
//   }

//   // Helper para acesso fácil aos controles no template
//   get f() { return this.profileForm.controls; }
//   get fAddress() { return (this.profileForm.get('address') as FormGroup)?.controls; }

//   // Navegar para a página de alteração de senha
//   goToChangePassword(): void {
//     this.router.navigate(['/change-password']);
//   }
// }
