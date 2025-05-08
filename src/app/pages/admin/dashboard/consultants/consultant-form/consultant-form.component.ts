import { Component, OnInit, OnDestroy, inject, signal, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'; // Adicionado OnDestroy, ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects'; // Importar Actions e ofType
import { Observable, Subscription, filter, take, tap } from 'rxjs'; // Importar Subscription, filter, take, tap
import { AppState } from '@app/core/store/app.state'; // Ajuste o caminho
import { IConsultant } from '@app/pages/admin/dashboard/models'; // Ajuste o caminho
import { createConsultant, updateConsultant, loadConsultantById, consultantActionFailure, createConsultantSuccess, updateConsultantSuccess, clearConsultantError } from '@app/core/store/consultant/consultant.actions'; // Caminho real
import { selectCurrentConsultant, selectConsultantLoading, selectConsultantError } from '@app/core/store/consultant/consultant.selectors'; // Caminho real
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Para notificações

@Component({
  selector: 'app-consultant-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './consultant-form.component.html',
  // styleUrls: ['./consultant-form.component.scss'] // Descomentar se criar um arquivo SCSS
  changeDetection: ChangeDetectionStrategy.OnPush, // Usar OnPush
})
export class ConsultantFormComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private store = inject(Store<AppState>);
  private actions$ = inject(Actions); // Injetar Actions
  private translate = inject(TranslateService);
  private snackBar = inject(MatSnackBar); // Injetar Snackbar
  private cdr = inject(ChangeDetectorRef); // Injetar ChangeDetectorRef

  form!: FormGroup;
  isEditMode = signal(false);
  consultantId = signal<string | null>(null);

  // Usar selectors diretamente
  loading$: Observable<boolean> = this.store.select(selectConsultantLoading);
  error$: Observable<any> = this.store.select(selectConsultantError);

  private subscriptions = new Subscription(); // Para gerenciar subscriptions

  ngOnInit(): void {
    this.buildForm();
    this.checkEditMode();
    this.subscribeToFormChanges();
    this.subscribeToActions(); // Ouvir success/failure actions
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Limpar subscriptions
    this.store.dispatch(clearConsultantError()); // Limpar erro ao sair
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]], // Adicionar validador de telefone específico se necessário
      status: [true, [Validators.required]], // Default to active
    });
  }

  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Usar snapshot para pegar o ID inicial
    if (id) {
      this.isEditMode.set(true);
      this.consultantId.set(id);
      this.store.dispatch(loadConsultantById({ id })); // Disparar ação para carregar

      // Observar o consultor carregado para preencher o formulário
      const sub = this.store.select(selectCurrentConsultant).pipe(
        filter(consultant => !!consultant), // Só prosseguir se o consultor for carregado
        take(1) // Pegar apenas o primeiro valor emitido (o consultor carregado)
      ).subscribe(consultant => {
        if (consultant) {
          this.form.patchValue({
            name: consultant.name,
            email: consultant.email,
            phone: consultant.phone,
            status: consultant.status,
          });
          this.cdr.markForCheck(); // Marcar para verificação de mudanças
        }
      });
      this.subscriptions.add(sub);

    } else {
      this.isEditMode.set(false);
    }
  }

   private subscribeToFormChanges(): void {
    // Limpar erro ao interagir com o formulário
    const sub = this.form.valueChanges.pipe(
        // Opcional: debounceTime(100) se a limpeza for muito frequente
    ).subscribe(() => {
      this.store.dispatch(clearConsultantError());
    });
    this.subscriptions.add(sub);
  }

  private subscribeToActions(): void {
    // Ouvir ações de sucesso
    const successSub = this.actions$.pipe(
      ofType(createConsultantSuccess, updateConsultantSuccess),
      tap((action) => {
        const messageKey = action.type === createConsultantSuccess.type
          ? 'admin.consultants.successCreate'
          : 'admin.consultants.successUpdate';
        this.showNotification(this.translate.instant(messageKey), 'success');
        // A navegação já é feita pelo effect redirectAfterSave$
      })
    ).subscribe();
    this.subscriptions.add(successSub);

    // Ouvir ações de falha genérica (já tratada no effect, mas pode adicionar UI específica aqui se necessário)
    // const failureSub = this.actions$.pipe(
    //   ofType(createConsultantFailure, updateConsultantFailure, loadConsultantByIdFailure),
    //   tap(({ error }) => {
    //      const message = error?.message || 'Ocorreu um erro.';
    //      this.showNotification(message, 'error');
    //   })
    // ).subscribe();
    // this.subscriptions.add(failureSub);
  }


  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.showNotification(this.translate.instant('admin.consultants.errors.validation'), 'error');
      return;
    }

    // Não precisa setar loading/saving localmente, o estado NgRx cuida disso

    const consultantData = this.form.value;

    if (this.isEditMode() && this.consultantId()) {
      this.store.dispatch(updateConsultant({ id: this.consultantId()!, consultantData }));
    } else {
      this.store.dispatch(createConsultant({ consultantData }));
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/consultants']);
  }

  // Helpers para template
  get f() { return this.form.controls; }

  isInvalid(controlName: string): boolean {
    const control = this.f[controlName];
    return !!control?.invalid && (control.touched || control.dirty);
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.f[controlName];
    if (control?.errors && (control.touched || control.dirty)) {
      if (control.hasError('required')) {
        return this.translate.instant('validation.required'); // Usar chave genérica
      }
      if (control.hasError('email')) {
        return this.translate.instant('validation.email'); // Usar chave genérica
      }
      if (control.hasError('minlength')) {
        const requiredLength = control.getError('minlength')?.requiredLength;
        return this.translate.instant('validation.minLength', { min: requiredLength }); // Usar chave genérica
      }
      // Adicionar outras validações genéricas ou específicas aqui
    }
    return null;
  }

  private showNotification(message: string, panelClass: 'success' | 'error'): void {
    this.snackBar.open(message, this.translate.instant('close'), { // Adiciona botão 'Fechar' traduzido
      duration: 3000,
      panelClass: [panelClass === 'success' ? 'snackbar-success' : 'snackbar-error'], // Classes CSS para estilização
      verticalPosition: 'top',
    });
  }
}
