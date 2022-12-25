import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Topping } from '../models/topping.model';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class ToppingsService {
  constructor(private http: HttpClient) {}

  getToppings(): Observable<Topping[]> {
    return this.http
      .get<Topping[]>(`/api/toppings`)
      .pipe(catchError((error: any) => {
        throw error.message;
      }));
  }
}
