// import http from '../config/http';
// import { toast } from 'react-toastify';
// import {
//   IAuthParams,
//   IAuthResponse,
//   IDataResponse,
//   IResponseError,
//   ITokenResponse
// } from './types/types.auth';

// export default class AuthService {
//   /**
//    * Realiza login com e-mail e senha
//    */
//   public async loginService(
//     credentials: { email: string; password: string }
//   ): Promise<IAuthResponse | IResponseError> {
//     try {
//       const response = await http.post<IAuthResponse>('/auth/login', credentials);
//       return response.data; // Retorna o objeto de sucesso
//     } catch (error: any) {
//       toast.error(error?.response?.data?.message || 'Erro no login');
//       return { success: false }; // Retorna erro no padrão IResponseError
//     }
//   }

//   /**
//    * Realiza logout para o usuário
//    */
//   public async logoutService(
//     credentials: { _id: string }
//   ): Promise<IAuthResponse | IResponseError> {
//     try {
//       const response = await http.post<IAuthResponse | IResponseError>(
//         '/auth/logout',
//         credentials
//       );
//       return response.data;
//     } catch (error: any) {
//       toast.error(error?.response?.data?.message || 'Erro ao efetuar logout');
//       return { success: false };
//     }
//   }

//   /**
//    * Solicita a renovação do token
//    */
//   public async refreshTokenService(
//     credentials: { _id: string }
//   ): Promise<ITokenResponse | IResponseError> {
//     try {
//       const response = await http.post<ITokenResponse>(
//         '/auth/refresh-token',
//         credentials
//       );
//       return response.data;
//     } catch (error: any) {
//       toast.error(error?.response?.data?.message || 'Erro ao renovar token');
//       return { success: false };
//     }
//   }

//   /**
//    * Verifica se um token ainda é válido
//    */
//   public async checkTokenService(
//     credentials: { token: string }
//   ): Promise<ITokenResponse | IResponseError> {
//     try {
//       const response = await http.post<ITokenResponse>(
//         '/auth/check-token',
//         credentials
//       );
//       /**
//        * Neste caso, estamos retornando apenas IResponseError (sucesso ou não),
//        * pois o código gera um objeto { success: response.data.success }.
//        * Caso queira retornar um ITokenResponse completo,
//        * bastaria retornar `response.data`.
//        */
//       return { success: response.data.success };
//     } catch (error: any) {
//       toast.error(error?.response?.data?.message || 'Token inválido');
//       return { success: false };
//     }
//   }

//   /**
//    * Redefine a senha usando o código de recuperação enviado por e-mail
//    */
//   public async resetPasswordService(
//     credentials: IAuthParams
//   ): Promise<IResponseError | IDataResponse> {
//     try {
//       // Ajuste a tipagem da chamada para cobrir os dois cenários de retorno
//       const response = await http.put<IResponseError | IDataResponse>(
//         '/auth/reset-password',
//         credentials
//       );
//       return response.data;
//     } catch (error: any) {
//       toast.error(error?.response?.data?.message || 'Erro ao redefinir senha');
//       return { success: false };
//     }
//   }

//   /**
//    * Solicita o envio de um código de recuperação de senha para o e-mail
//    */
//   public async passwordRecoveryService(
//     credentials: { email: string }
//   ): Promise<IResponseError | IDataResponse> {
//     try {
//       const response = await http.post<IResponseError | IDataResponse>(
//         '/auth/password-recovery',
//         credentials
//       );
//       return response.data;
//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message || 'Erro ao solicitar recuperação de senha'
//       );
//       return { success: false };
//     }
//   }
// }
