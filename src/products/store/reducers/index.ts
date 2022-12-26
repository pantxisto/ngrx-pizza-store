import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { PizzasAction, ToppingsAction } from '../actions';

import * as fromPizzas from './pizzas.reducer';
import * as fromToppings from './toppings.reducer';

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
  toppings: fromToppings.ToppingsState;
}

export const reducers: ActionReducerMap<ProductsState, any> = {
  pizzas: fromPizzas.reducer,
  toppings: fromToppings.reducer,
};

export const getProductsState =
  createFeatureSelector<ProductsState>('products');
