import { Component, Input } from '@angular/core';
import { AuthService } from '../../core/http/auth.service';

@Component({
    selector: 'app-change-password-page',
    templateUrl: './change-password-page.component.html',
})
export class ChangePasswordPageComponent {
    @Input() title: string = '';

    // Exemplo de objeto para capturar dados do formulário:
    formData = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    };

    constructor(private authService: AuthService) { }

    async onSubmitForm(): Promise<void> {
        try {
            await this.authService.resetPasswordService(this.formData);
            // Lógica adicional se necessário
            console.log('Senha redefinida com sucesso!');
        } catch (error) {
            console.error('Erro ao redefinir senha:', error);
        }
    }
}
