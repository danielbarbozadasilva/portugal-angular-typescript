// src/app/core/store/cart/cart.actions.ts
import { createAction, props } from '@ngrx/store';
import { ICartItem } from '../../models/models.cartItem'; // Ajustar se necessário

export const addItem = createAction(
  '[Cart] Add Item',
  props<{ item: ICartItem }>()
);

export const removeItem = createAction(
  '[Cart] Remove Item',
  props<{ activityId: string }>()
);

export const updateItemQuantity = createAction(
  '[Cart] Update Item Quantity',
  props<{ activityId: string; quantity: number }>()
);

export const clearCart = createAction('[Cart] Clear Cart');
