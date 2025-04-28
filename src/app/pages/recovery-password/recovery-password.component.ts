// components/change-password/change-password.component.ts
import { IComponentOptions, IController } from 'angular';
import { AuthService } from '../../core/http/auth.service';
import { IAuthParams, IDataResponse, IResponseError } from '../../core/models/models.auth'; // Importar IAuthParams, IDataResponse, IResponseError

// Definir um tipo local para o formulário que inclui confirmNewPassword
interface IRecoveryPasswordForm extends IAuthParams {
  confirmNewPassword?: string; // Tornar opcional ou inicializar
}

class ResetPasswordController implements IController {
  // Usar o tipo local IRecoveryPasswordForm
  public form: IRecoveryPasswordForm = {
    email: '',
    recoveryCode: '',
    newPassword: '',
    confirmNewPassword: '' // Inicializar
  };

  static $inject = ['AuthService'];
  constructor(public authService: AuthService) {}

  $onInit() {
    // TODO: Implementar lógica para obter email e recoveryCode (ex: de $routeParams ou estado)
    // Exemplo: Se vierem da URL como query params
    // const params = this.$location.search(); // Supondo injeção de $location
    // this.form.email = params.email;
    // this.form.recoveryCode = params.code;
  }

  public submitForm(): void {
    if (!this.form.email || !this.form.recoveryCode || !this.form.newPassword || !this.form.confirmNewPassword) {
      alert('Preencha todos os campos.');
      return;
    }

    if (this.form.newPassword !== this.form.confirmNewPassword) {
      alert('As senhas não conferem.');
      return;
    }

    // Criar payload apenas com os campos necessários para IAuthParams
    const payload: IAuthParams = {
        email: this.form.email,
        recoveryCode: this.form.recoveryCode,
        newPassword: this.form.newPassword
    };

    // Usar subscribe em vez de then/catch
    this.authService.resetPasswordService(payload).subscribe({
      next: (res: IDataResponse | IResponseError) => { // Adicionar tipo explícito para res
        // Verificar se a resposta indica sucesso
        if ('success' in res && res.success) {
            alert('Senha alterada com sucesso!');
            // Limpar campos sensíveis após sucesso
            this.form.newPassword = '';
            this.form.confirmNewPassword = '';
            this.form.recoveryCode = ''; // Opcional: limpar código
            // Opcional: redirecionar para login
            // this.$location.path('/login'); // Supondo injeção de $location
        } else if ('message' in res) {
            alert('Erro ao alterar a senha: ' + res.message);
        } else {
            // Fallback para caso a resposta não tenha nem success nem message
            alert('Resposta inesperada do servidor ao tentar alterar a senha.');
        }
      },
      error: (error: any) => { // Usar IResponseError que é o tipo retornado pelo handleError
        // O handleError no service já deve formatar o erro
        const message = error?.message || 'Erro desconhecido ao alterar a senha.';
        alert('Erro ao alterar a senha: ' + message);
      }
    });
  }
}

export const recoveryPasswordComponent: IComponentOptions = {
  controller: ResetPasswordController,
  templateUrl: 'app/pages/recovery-password/recovery-password.component.html'
};
