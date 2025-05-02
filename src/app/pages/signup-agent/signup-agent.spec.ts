import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupAgentComponent } from './signup-agent-component'; // Ajuste o path se necessário
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { signUpAgent } from '../../core/store/agent/agent.actions';
import { selectAgentLoading, selectAgentError } from '../../core/store/agent/agent.selectors';
import { AppState } from '../../core/store/reducers-map';
import { AgentState } from '@app/core/store/agent/agent.reducer';

describe('SignupAgentComponent', () => {
  let component: SignupAgentComponent;
  let fixture: ComponentFixture<SignupAgentComponent>;
  let store: MockStore<AppState>;
  let mockTranslateService: TranslateService;

  // Estado inicial mockado do NGRX
  const initialState: AgentState = {
    loading: false,
    error: null,
    currentAgent: null,
    signupSuccess: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
      declarations: [SignupAgentComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore) as MockStore<AppState>;
    // Mock dos selectors
    store.overrideSelector(selectAgentLoading, false);
    store.overrideSelector(selectAgentError, null);

    fixture = TestBed.createComponent(SignupAgentComponent);
    component = fixture.componentInstance;
    mockTranslateService = TestBed.inject(TranslateService);

    // Se quiser evitar logs de erro de tradução no console, podemos setar um translationId para testes
    mockTranslateService.setTranslation('en', {
      'signupAgentPage.title': 'Signup Agent',
      'validation.required': 'Required',
      // etc. ...
    });
    mockTranslateService.use('en');

    fixture.detectChanges();
  });

  afterEach(() => {
    store.resetSelectors();
    fixture.destroy();
  });

  it('deve criar o componente sem erros', () => {
    expect(component).toBeTruthy();
  });

  it('deve ter um formulário definido após a inicialização', () => {
    expect(component.signupForm).toBeDefined();
    expect(component.signupForm.controls).toBeDefined();
  });

  it('deve exibir o título do formulário no template (usando a tradução)', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    const h2Elem = compiled.querySelector('h2');
    expect(h2Elem?.textContent).toContain('Signup Agent');
  });

  it('deve iniciar com o formulário inválido se estiver vazio', () => {
    expect(component.signupForm.valid).toBeFalse();
  });

  it('deve validar o campo de email como required e email format', () => {
    const emailControl = component.signupForm.get('email');
    if (!emailControl) {
      fail('Form control "email" não encontrado!');
    }

    emailControl.setValue('');
    expect(emailControl.valid).toBeFalse();
    expect(emailControl.errors).toBeTruthy();
    expect(emailControl.hasError('required')).toBeTrue();

    // Testando formato de e-mail
    emailControl.setValue('invalid_email');
    expect(emailControl.valid).toBeFalse();
    expect(emailControl.hasError('email')).toBeTrue();

    emailControl.setValue('valid.email@test.com');
    expect(emailControl.valid).toBeTrue();
  });

  it('deve exibir mensagens de erro para campos obrigatórios quando o formulário é submetido vazio', () => {
    component.signupForm.markAllAsTouched();
    fixture.detectChanges();

    // Procuramos o elemento de email no template
    const emailErrorElem = fixture.debugElement.query(By.css('#email + .input-error-message'));
    expect(emailErrorElem).toBeTruthy();

    // Você pode verificar o texto exato se desejar
    const errorText = emailErrorElem.nativeElement.textContent.trim();
    expect(errorText).toContain('Required');
  });

  it('deve ativar validação de cpf quando agentType é Pessoa Física', () => {
    const agentTypeControl = component.signupForm.get('agentType');
    const cpfControl = component.signupForm.get('cpf');
    expect(agentTypeControl).toBeTruthy();
    expect(cpfControl).toBeTruthy();

    agentTypeControl?.setValue('Pessoa Física');
    fixture.detectChanges();

    expect(cpfControl?.validator).toBeDefined();
    // Forçar validação
    cpfControl?.updateValueAndValidity();
    cpfControl?.setValue('');
    expect(cpfControl?.invalid).toBeTrue();
    expect(cpfControl?.hasError('required')).toBeTrue();
  });

  it('deve ativar validação de cnpj e companyName quando agentType é Pessoa Jurídica', () => {
    const agentTypeControl = component.signupForm.get('agentType');
    const cnpjControl = component.signupForm.get('cnpj');
    const companyNameControl = component.signupForm.get('companyName');
    expect(agentTypeControl).toBeTruthy();
    expect(cnpjControl).toBeTruthy();
    expect(companyNameControl).toBeTruthy();

    agentTypeControl?.setValue('Pessoa Jurídica');
    fixture.detectChanges();

    cnpjControl?.updateValueAndValidity();
    expect(cnpjControl?.errors?.required).toBeTrue();

    companyNameControl?.updateValueAndValidity();
    expect(companyNameControl?.errors?.required).toBeTrue();
  });

  it('deve despachar action signUpAgent ao submeter formulário válido', () => {
    // Espiamos as ações enviadas pelo store
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    // Vamos preencher o formulário com valores válidos
    component.signupForm.patchValue({
      name: 'Teste Válido',
      email: 'valid@test.com',
      password: 'Teste@1234', // Exemplo compatível com strongPasswordValidator
      confirmPassword: 'Teste@1234',
      agentType: 'Pessoa Física',
      cpf: '123.456.789-10', // Ajuste: supõe que o validador aceita
      mobilePhone: '1111111111',
      address: {
        zipCode: '12345-678',
        street: 'Rua Teste',
        number: '123',
        neighborhood: 'Bairro',
        city: 'Cidade',
        state: 'ST',
      },
      // ...demais campos se forem required
    });

    component.onSubmit();
    fixture.detectChanges();

    // Verifica se o formulário não está inválido
    expect(component.signupForm.invalid).toBeFalse();

    // Checa se a action signUpAgent foi despachada
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const [actionCalled] = dispatchSpy.calls.mostRecent().args;
    expect(actionCalled.type).toBe(signUpAgent.type);

    // Podemos verificar se o payload foi montado corretamente
    expect(actionCalled.agentData.name).toBe('Teste Válido');
    expect(actionCalled.agentData.email).toBe('valid@test.com');
  });

  it('não deve despachar action se o formulário estiver inválido', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    // Não preenchemos nada e submetemos
    component.onSubmit();
    fixture.detectChanges();

    expect(component.signupForm.invalid).toBeTrue();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('deve mostrar/ocultar a senha ao chamar toggleShowPassword', () => {
    expect(component.showPassword()).toBeFalse();
    component.toggleShowPassword();
    expect(component.showPassword()).toBeTrue();
  });

  it('deve mostrar/ocultar a senha de confirmação ao chamar toggleShowConfirmPassword', () => {
    expect(component.showConfirmPassword()).toBeFalse();
    component.toggleShowConfirmPassword();
    expect(component.showConfirmPassword()).toBeTrue();
  });

  // Caso queira testar blur e formatação de CPFs/Phones, adicione testes específicos
  // it('deve formatar o CPF no onBlur', () => {
  //   // ...
  // });

  // etc.
});
