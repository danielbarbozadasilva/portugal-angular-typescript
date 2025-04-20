/**
 * Este arquivo contém todas as interfaces usadas no contexto de autenticação.
 */

export interface IAuthParams {
    email: string;
    recoveryCode: string;
    newPassword: string;
  }
  
  export interface IDataResponse {
    status: number;
    success: boolean;
    message: string;
    data: Record<string, unknown>; 
    /**
     * Caso queira um tipo mais específico para `data`, substitua `Record<string, unknown>`
     * por uma estrutura de dados mais detalhada.
     */
  }
  
  export interface IAuthResponse {
    status: number;
    success: boolean;
    message: string;
    data: {
      token: string;
      username: string;
      name: string;
      email: string;
      permissions: string;
    };
  }
  
  export interface IResponseError {
    success: boolean;
    /**
     * Se o back-end também retorna mensagem ou status neste caso de erro,
     * você pode incluir mais campos aqui (por exemplo, `message?: string; status?: number;`).
     */
  }
  
  export interface ITokenResponse {
    status: number;
    success: boolean;
    message: string;
    data: {
      token: string;
      refreshToken: {
        data: string;
        expiresIn: number;
        iv: string;
      };
    };
  }
  