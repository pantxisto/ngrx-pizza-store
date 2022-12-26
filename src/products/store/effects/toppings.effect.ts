import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as toppingsActions from '../actions/toppings.action';
import * as fromServices from '../../services/toppings.service';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class ToppingsEffects {
  constructor(
    private actions$: Actions,
    private toppingsService: fromServices.ToppingsService
  ) {}

  loadToppings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toppingsActions.LOAD_TOPPINGS),
      switchMap(() => {
        return this.toppingsService.getToppings().pipe(
          map((toppings) => new toppingsActions.LoadToppingsSuccess(toppings)),
          catchError((error) => of(new toppingsActions.LoadToppingsFail(error)))
        );
      })
    )
  );
}
