import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from "rxjs";

import { AnimalsService } from '../../services/animals.service';
import * as animalsActions from '../actions/animals.action';

@Injectable()
export class AnimalsEffect {
  constructor(
    private actions$: Actions,
    private animalsService: AnimalsService
  ) {}

  loadAnimals$ = createEffect(() => this.actions$.pipe(
    ofType(animalsActions.getAnimals),
    switchMap(() => this.animalsService.getAnimals()
      .pipe(
        map(animals => animalsActions.getAnimalsSuccess({payload: animals}))
      ))
  ))
}
