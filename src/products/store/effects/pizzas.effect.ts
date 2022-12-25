import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';
import { of } from 'rxjs';

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService
  ) {}

  loadPizzas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pizzaActions.LOAD_PIZZAS),
      switchMap(() => {
        return this.pizzaService.getPizzas().pipe(
          map((pizzas) => new pizzaActions.LoadPizzasSuccess(pizzas)),
          catchError((error) => of(new pizzaActions.LoadPizzasFail(error)))
        );
      })
    )
  );
}
