import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Observable, map } from 'rxjs'
import { SolicitationCartService } from '../../core/http/solicitationsCartItem.service'
import { ISolicitationCartItem } from '../../core/models/models.solicitationCartItem'

@Component({
  standalone: true,
  selector: 'app-solicitation-cart',
  templateUrl: './solicitation-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class SolicitationCartComponent implements OnInit {
  items$!: Observable<ISolicitationCartItem[]>
  total$!: Observable<number>
  count$!: Observable<number>
  isEmpty$!: Observable<boolean>

  constructor(private service: SolicitationCartService) {}

  ngOnInit(): void {
    this.items$ = this.service.cartItems$
    this.total$ = this.service.total$
    this.count$ = this.service.count$
    this.isEmpty$ = this.count$.pipe(map(count => count === 0))
  }

  trackById(index: number, item: ISolicitationCartItem): string {
    return item._id || String(index)
  }

  remove(item: ISolicitationCartItem): void {
    if (item._id) {
      this.service.removeItem(item._id)
    }
  }

  updatePrice(item: ISolicitationCartItem, event: Event): void {
    const input = event.target as HTMLInputElement
    const val = parseFloat(input.value)
    if (!isNaN(val) && item._id) {
      this.service.updateItemPrice(item._id, val)
    }
  }

  clear(): void {
    this.service.clearCart()
  }
}
