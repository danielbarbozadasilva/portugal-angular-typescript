import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Import ReactiveFormsModule
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { switchMap, filter, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UserService } from '../../../../core/http/user.service'; // Ajuste o caminho
import { IUser } from '../../../../core/models/models.user'; // Ajuste o caminho
// Importar validadores customizados se necessário
// import { CustomValidators } from '../../../shared/validators/custom-validators';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // Para o botão de voltar
    ReactiveFormsModule, // Adicionar ReactiveFormsModule
    TranslateModule,
  ],
  templateUrl: './user-list.component.html',
  // styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  translate = inject(TranslateService);

  userForm!: FormGroup; // Usar ! para indicar que será inicializado no ngOnInit
  userId = signal<string | null>(null);
  isEditMode = signal<boolean>(false);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  saving = signal<boolean>(false);

  ngOnInit(): void {
    this.initializeForm();

    this.route.paramMap
      .pipe(
        tap((params) => {
          const id = params.get('id');
          this.userId.set(id);
          this.isEditMode.set(!!id); // Define true se id existir
          this.loading.set(true);
          this.error.set(null);
        }),
        filter((params) => !!params.get('id')), // Procede apenas se houver ID (modo edição)
        switchMap((params) => this.userService.getUserById(params.get('id')!))
      )
      .subscribe({
        next: (user) => {
          this.populateForm(user);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error loading user data:', err);
          this.error.set(this.translate.instant('errors.genericLoadError') || 'Failed to load user data.');
          this.loading.set(false);
        },
      });

    // Se não houver ID, apenas termina o loading (modo criação, se implementado)
    if (!this.isEditMode()) {
      this.loading.set(false);
    }
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      id: [''], // Mantém o ID, mas desabilitado no template
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      // Adicionar outros campos editáveis pelo admin (ex: roles, status?)
      // Cuidado ao permitir edição de senha aqui. Geralmente é um fluxo separado.
      // status: ['active', Validators.required] // Exemplo se status for editável
    });
  }

  populateForm(user: IUser): void {
    this.userForm.patchValue({
      id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      // status: user.status // Exemplo
    });
    // Desabilitar campos que não devem ser editados (ex: ID, talvez email/username)
    // this.userForm.get('email')?.disable();
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched(); // Marca campos inválidos
      return;
    }

    this.saving.set(true);
    this.error.set(null);
    const formData = this.userForm.getRawValue(); // getRawValue() inclui campos desabilitados se necessário

    let saveObservable: Observable<IUser>;

    if (this.isEditMode() && this.userId()) {
      saveObservable = this.userService.updateUser(this.userId()!, formData);
    } else {
      // Lógica para criar novo usuário (se implementado)
      // saveObservable = this.userService.createUser(formData);
      console.warn('Create user not implemented in this form.');
      this.saving.set(false);
      return; // Retorna se não for modo edição
    }

    saveObservable.subscribe({
      next: () => {
        this.saving.set(false);
        // Exibir mensagem de sucesso (Toast/Snackbar)
        alert(this.translate.instant('admin.users.saveSuccess') || 'User saved successfully!');
        this.router.navigate(['/admin/users']); // Volta para a lista
      },
      error: (err) => {
        console.error('Error saving user:', err);
        this.error.set(this.translate.instant('errors.genericSaveError') || 'Failed to save user.');
        this.saving.set(false);
      },
    });
  }

  // Helper para acesso fácil aos controles no template
  get f() {
    return this.userForm.controls;
  }

  goBack(): void {
    this.router.navigate(['/admin/users']);
  }
}
