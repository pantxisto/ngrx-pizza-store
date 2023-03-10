import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import { tap, Observable } from 'rxjs';

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  template: `
    <div class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)"
      >
        <pizza-display [pizza]="visualise$ | async"> </pizza-display>
      </pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  pizza$!: Observable<Pizza>;
  visualise$!: Observable<Pizza>;
  toppings$!: Observable<Topping[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.pizza$ = this.store.select(fromStore.getSelectedPizza).pipe(
      tap((pizza: Pizza | null = null) => {
        const pizzaExists = !!(pizza && pizza.toppings);
        const toppings = pizzaExists
          ? pizza.toppings?.map((topping) => topping.id)
          : [];
        this.store.dispatch(
          new fromStore.VisualizeToppings(toppings as number[])
        );
      })
    ) as Observable<Pizza>;
    this.toppings$ = this.store.select(fromStore.getAllToppings);
    this.visualise$ = this.store.select(fromStore.getPizzaVisualized);
  }

  onSelect(event: any) {
    this.store.dispatch(new fromStore.VisualizeToppings(event));
  }

  onCreate(event: Pizza) {}

  onUpdate(event: Pizza) {}

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
    }
  }
}
