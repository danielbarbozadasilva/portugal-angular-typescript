import { createAction, props } from '@ngrx/store';

export interface Address {
  street: string;
  city: string;
  country: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  address: Address;
  phones: string[];
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  address: Address;
  phones: string[];
}

// Ação para iniciar o processo de cadastro de cliente
export const signUpClient = createAction(
  '[Client] Sign Up Client',
  props<{ data: SignUpData }>()
);

// Ação disparada em caso de sucesso no cadastro
export const signUpClientSuccess = createAction(
  '[Client] Sign Up Client Success',
  props<{ client: Client }>()
);

// Ação disparada em caso de falha no cadastro
export const signUpClientFailure = createAction(
  '[Client] Sign Up Client Failure',
  props<{ error: string }>()
);
