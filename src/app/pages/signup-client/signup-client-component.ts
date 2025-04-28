import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { signUpClient} from '../../core/store/client/client.actions';
import { ClientState } from '../../core/store/client/client.reducer';
import { selectClient, selectError, selectLoading } from '../../core/store/client/client.selectors';

@Component({
  selector: 'app-signup-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './signup-client.component.html',
})
export class SignUpClientComponent implements OnInit {
  // Formulário do cadastro com tipagem completa dos controles
  signupForm: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    address: FormGroup<{
      street: FormControl<string>;
      city: FormControl<string>;
      country: FormControl<string>;
    }>;
    phones: FormArray<FormControl<string>>;
  }>;

  // Observables para estado de loading e erro do NGRX
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  // Observable para verificar sucesso (cliente cadastrado)
  client$: Observable<any | null>;

  constructor(private fb: FormBuilder, private store: Store<{ client: ClientState }>) {
    // Construção do FormGroup com subgrupos aninhados e FormArray
    this.signupForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: this.fb.nonNullable.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required]
      }),
      phones: this.fb.nonNullable.array([
        this.fb.nonNullable.control('', Validators.required)
      ])
    });
    // Seletores de estado para feedback de loading/erro
    this.loading$ = this.store.select(selectLoading) as any;
    this.error$ = this.store.select(selectError) as any;
    this.client$ = this.store.select(selectClient);

  }

  ngOnInit(): void {
    // Poderia ser disparada alguma ação de inicialização aqui, se necessário (e.g., limpar estado anterior)
  }

  // Getter para facilitar o acesso ao FormArray de telefones no template
  get phones(): FormArray<FormControl<string>> {
    return this.signupForm.get('phones') as FormArray<FormControl<string>>;
  }

  // Adiciona um novo campo de telefone ao FormArray
  addPhone(): void {
    this.phones.push(this.fb.nonNullable.control('', Validators.required));
  }

  // Remove um campo de telefone pelo índice (mantém pelo menos um)
  removePhone(index: number): void {
    if (this.phones.length > 1) {
      this.phones.removeAt(index);
    }
  }

  // Submissão do formulário de cadastro
  submit(): void {
    if (this.signupForm.invalid) {
      // Marca todos os controles como "tocados" para exibir erros de validação
      this.signupForm.markAllAsTouched();
      return;
    }
    // Obtém os dados do formulário tipados como SignUpData
    const formData: any = this.signupForm.value;
    // Dispara a ação NGRX para cadastrar o cliente
    this.store.dispatch(signUpClient({ data: formData } as any));
  }
}
