import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SignUpClientComponent } from './signup-client-component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppState } from '../../core/store/reducers-map';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Actions, EffectsModule } from '@ngrx/effects';
import { Subject } from 'rxjs';
import { signUpClient, signUpClientSuccess, signUpClientFailure } from '../../core/store/client/client.actions';
import { ClientState } from '@app/core/store/client/client.reducer';

describe('SignUpClientComponent', () => {
  let component: SignUpClientComponent;
  let fixture: ComponentFixture<SignUpClientComponent>;
  let store: MockStore<AppState>;
  let actionsSubj: Subject<any>;

  const initialState: ClientState = {
    loading: false,
    error: null,
    client: null,
  };

  beforeEach(async () => {
    actionsSubj = new Subject();

    await TestBed.configureTestingModule({
      imports: [
        SignUpClientComponent, // import standalone
        ReactiveFormsModule,
        // Módulo de tradução (mock), se quiser
        TranslateModule.forRoot(),
        // Caso queira usar EffectsModule:
        EffectsModule.forRoot([]),
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: Actions, useValue: actionsSubj.asObservable() },
        TranslateService,
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SignUpClientComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  // ---------------------------------------------------
  // 1) Testa se o componente foi criado corretamente
  // ---------------------------------------------------
  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  // ---------------------------------------------------
  // 2) Testa se o form é criado com os controles esperados
  // ---------------------------------------------------
  it('deve criar o FormGroup com controles esperados', () => {
    const form = component.signupForm;
    expect(form).toBeTruthy();

    // Verifica presença de campos top-level
    expect(form.get('name')).toBeTruthy();
    expect(form.get('email')).toBeTruthy();
    expect(form.get('password')).toBeTruthy();
    expect(form.get('confirmPassword')).toBeTruthy();
    expect(form.get('phones')).toBeTruthy();

    // Verifica se address é um FormGroup e seus controles
    const addressGroup = form.get('address');
    expect(addressGroup).toBeTruthy();
    expect(addressGroup?.get('street')).toBeTruthy();
    expect(addressGroup?.get('city')).toBeTruthy();
    expect(addressGroup?.get('country')).toBeTruthy();
    expect(addressGroup?.get('zipCode')).toBeTruthy();
    expect(addressGroup?.get('state')).toBeTruthy();
    expect(addressGroup?.get('number')).toBeTruthy();
    expect(addressGroup?.get('complement')).toBeTruthy();
  });

  // ---------------------------------------------------
  // 3) Testa validações do formulário
  // ---------------------------------------------------
  it('deve marcar inválido se campos obrigatórios estiverem vazios', () => {
    const form = component.signupForm;

    // Deixa tudo vazio
    form.setValue({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: {
        street: '',
        city: '',
        country: '',
        zipCode: '',
        state: '',
        number: '',
        complement: '',
        neighborhood: '', // Se ainda existir
      },
      phones: [], // Se for array, ou [''] se inicia assim
      // Se houver termsAccepted
      // termsAccepted: false
    });

    expect(form.valid).toBeFalse();
    // Força ver que 'name' está required
    expect(form.get('name')?.errors?.['required']).toBeTrue();
    expect(form.get('email')?.errors?.['required']).toBeTrue();
    expect(form.get('password')?.errors?.['required']).toBeTrue();
    // etc.
  });

  it('deve requerer password e confirmPassword iguais', () => {
    const form = component.signupForm;
    form.patchValue({
      password: 'SenhaForte123',
      confirmPassword: 'SenhaDiferente456',
    });
    // dispara a validação do form
    form.updateValueAndValidity();

    expect(form.errors).toBeTruthy();
    // se o validador gera 'passwordMismatch'
    expect(form.errors?.['passwordMismatch']).toBeTrue();
  });

  it('deve aceitar password e confirmPassword iguais', () => {
    const form = component.signupForm;
    form.patchValue({
      password: 'SenhaForte123',
      confirmPassword: 'SenhaForte123',
    });
    form.updateValueAndValidity();

    // O form não deve ter errors de mismatch
    expect(form.errors).toBeNull();
  });

  // ---------------------------------------------------
  // 4) Testa comportamento do FormArray phones
  // ---------------------------------------------------
  it('deve iniciar com pelo menos 1 phone no array', () => {
    const phonesArray = component.signupForm.get('phones') as FormArray;
    expect(phonesArray).toBeTruthy();
    expect(phonesArray.length).toBeGreaterThanOrEqual(1);
  });

  it('deve adicionar um novo campo de phone ao chamar addPhone()', () => {
    const phonesArray = component.signupForm.get('phones') as FormArray ;
    const initLength = phonesArray.length;
    expect(phonesArray.length).toBe(initLength + 1);
  });

  // ---------------------------------------------------
  // 5) Testa submit do form e disparo de action
  // ---------------------------------------------------
  it('não deve disparar action se o form for inválido', () => {
    spyOn(store, 'dispatch').and.callThrough();
    // deixa o form inválido
    component.signupForm.patchValue({
      name: '',
      email: 'email-invalido', // mas sem @...
      password: '',
      confirmPassword: '',
      address: {
        street: '',
        city: '',
        country: '',
        zipCode: '',
        state: '',
        number: '',
        complement: '',
        neighborhood: '', // se existir
      },
      phones: [],
      // termsAccepted: false se existir
    });

    component.onSubmit();
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(component.errorMessage()).toBeTruthy();
  });

  it('deve disparar action signUpClient com payload correto se form estiver válido', () => {
    spyOn(store, 'dispatch').and.callThrough();

    component.signupForm.patchValue({
      name: 'Nome Teste',
      email: 'teste@example.com',
      password: 'Abc123@@@',
      confirmPassword: 'Abc123@@@',
      address: {
        street: 'Rua A',
        city: 'Cidade B',
        country: 'Brasil',
        zipCode: '12345678',
        state: 'Estado C',
        number: '99',
        complement: '',
        neighborhood: 'Distrito X',
      },
      phones: ['11111111'],
    });

    component.onSubmit();
    expect(component.signupForm.valid).toBeTrue();
    expect(store.dispatch).toHaveBeenCalled();

    // Verifica se a action signUpClient foi chamada
    const [[actionDispatched]] = (store.dispatch as jasmine.Spy).calls.allArgs();
    expect(actionDispatched.type).toBe(signUpClient.type);
    // Verifica se o payload possui os dados
    expect(actionDispatched.data.name).toBe('Nome Teste');
    expect(actionDispatched.data.email).toBe('teste@example.com');
    // ...
    // Lembre que confirmPassword não deve estar no payload final (caso você remova).
  });

  // ---------------------------------------------------
  // 6) Testa comportamento ao receber signUpClientSuccess
  // ---------------------------------------------------
  it('deve setar successMessage e resetar formulário ao receber signUpClientSuccess', () => {
    // Preenche algo no form
    component.signupForm.patchValue({
      name: 'Algum nome',
    });

    actionsSubj.next(
      signUpClientSuccess({
        client: {
          name: 'Cliente Sucesso',
          user: '123',
          phones: [],
          address: {
            street: '',
            number: '',
            district: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            complement: '',
          },
          birthDate: '',
        },
      })
    );

    // Aguarda ciclo
    fixture.detectChanges();

    expect(component.successMessage()).toContain('Cliente Sucesso');
    // O form deve ter sido resetado
    expect(component.signupForm.value.name).toBe('', 'O campo name deve ter sido resetado');
  });

  // ---------------------------------------------------
  // 7) Testa comportamento ao receber signUpClientFailure
  // ---------------------------------------------------
  it('deve setar errorMessage ao receber signUpClientFailure', () => {
    actionsSubj.next(signUpClientFailure({ error: 'Ocorreu um erro no cadastro' }));
    fixture.detectChanges();

    expect(component.errorMessage()).toBe('Ocorreu um erro no cadastro');
  });

  // ---------------------------------------------------
  // 8) Testa funções de exibir/ocultar senha
  // ---------------------------------------------------
  it('deve alternar valor de showPassword ao chamar toggleShowPassword()', () => {
    const initial = component.showPassword();
    component.toggleShowPassword();
    expect(component.showPassword()).toBe(!initial);
  });

  it('deve alternar valor de showConfirmPassword ao chamar toggleShowConfirmPassword()', () => {
    const initial = component.showConfirmPassword();
    component.toggleShowConfirmPassword();
    expect(component.showConfirmPassword()).toBe(!initial);
  });

  // ---------------------------------------------------
  // 9) Testa focusFirstInvalidField (opcional)
  // ---------------------------------------------------
  it('deve chamar focusFirstInvalidField se o form estiver inválido ao submeter', () => {
    spyOn(component as any, 'focusFirstInvalidField').and.callThrough();

    component.signupForm.patchValue({
      name: '', // required
      // resto se quiser
    });
    component.onSubmit();

    expect((component as any).focusFirstInvalidField).toHaveBeenCalled();
  });
});
