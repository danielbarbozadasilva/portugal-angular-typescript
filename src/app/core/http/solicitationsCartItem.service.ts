import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs'
import { ISolicitationCartItem } from '../../core/models/models.solicitationCartItem'

@Injectable({
  providedIn: 'root'
})
export class SolicitationCartService {
  private itemsSubject = new BehaviorSubject<ISolicitationCartItem[]>([])
  private items$ = this.itemsSubject.asObservable()

  get cartItems$(): Observable<ISolicitationCartItem[]> {
    return this.items$
  }

  get count$(): Observable<number> {
    return this.items$.pipe(map(items => items.length))
  }

  get total$(): Observable<number> {
    return this.items$.pipe(map(items => items.reduce((acc, curr) => acc + curr.price, 0)))
  }

  addItem(item: ISolicitationCartItem): void {
    const list = this.itemsSubject.value
    this.itemsSubject.next([...list, item])
  }

  removeItem(id: string): void {
    const list = this.itemsSubject.value.filter(x => x._id !== id)
    this.itemsSubject.next(list)
  }

  updateItemPrice(id: string, newPrice: number): void {
    const updated = this.itemsSubject.value.map(x => {
      if (x._id === id) return { ...x, price: newPrice }
      return x
    })
    this.itemsSubject.next(updated)
  }

  clearCart(): void {
    this.itemsSubject.next([])
  }
}
