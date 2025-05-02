import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SolicitationCartService } from '../../core/http/solicitationsCartItem.service';
import { ISolicitationCartItem } from '../../core/models/models.solicitationCartItem';

@Component({
  standalone: true,
  selector: 'app-solicitation-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})

export class SolicitationCartComponent {

  items$: Observable<ISolicitationCartItem[]> = this.service.cartItems$;
  total$: Observable<number> = this.service.total$;
  count$: Observable<number> = this.service.count$;
  isEmpty$: Observable<boolean> = this.count$.pipe(map(v => v === 0));

  constructor(private service: SolicitationCartService) {}

  /**
   * trackById
   * Função para ajudar o Angular a rastrear os itens na *ngFor
   */
  trackById(index: number, item: ISolicitationCartItem): string {
    return item._id || String(index);
  }

  /**
   * remove
   * Remove um item do carrinho pelo seu _id
   */
  remove(item: ISolicitationCartItem): void {
    if (item._id) {
      this.service.removeItem(item._id);
    }
  }

  /**
   * updatePrice
   * Atualiza o preço do item (exemplo) ao mudar o valor do input
   */
  updatePrice(item: ISolicitationCartItem, event: Event): void {
    const input = event.target as HTMLInputElement;
    const val = parseFloat(input.value);
    if (!isNaN(val) && item._id) {
      this.service.updateItemPrice(item._id, val);
    }
  }

  /**
   * clear
   * Limpa todo o carrinho
   */
  clear(): void {
    this.service.clearCart();
  }
}
