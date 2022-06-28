import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs';

import { AnimalsService } from '../../services/animals.service';
import * as animalsActions from '../actions/animals.action';
import { IProps } from '../../interfaces/props.interface';
import { IAnimal, IAnimalPayload } from '../../interfaces/animal.interface';

@Injectable()
export class AnimalsEffect {
  constructor(
    private actions$: Actions,
    private animalsService: AnimalsService
  ) {}

  getAnimals$ = createEffect(() => this.actions$.pipe(
    ofType(animalsActions.getAnimals),
    switchMap(() => this.animalsService.getAnimals()
      .pipe(
        map(animals => animalsActions.getAnimalsSuccess({payload: animals}))
      ))
  ))

  createAnimal$ = createEffect(() => this.actions$.pipe(
    ofType(animalsActions.createAnimal),
    switchMap((props: IProps<IAnimalPayload>) => this.animalsService.createAnimal(props.payload)
      .pipe(
        map((animal: IAnimal) => animalsActions.createAnimalSuccess({payload: animal}))
      ))
  ))

  updateAnimal$ = createEffect(() => this.actions$.pipe(
    ofType(animalsActions.updateAnimal),
    switchMap((props: IProps<{id: number, data: IAnimalPayload}>) => this.animalsService.updateAnimal(props.payload.id, props.payload.data)
      .pipe(
        map(() => animalsActions.updateAnimalSuccess(props))
      ))
  ))

  deleteAnimal$ = createEffect(() => this.actions$.pipe(
    ofType(animalsActions.deleteAnimal),
    switchMap((props: IProps<number>) => this.animalsService.deleteAnimal(props.payload)
      .pipe(
        map(() => animalsActions.deleteAnimalSuccess(props))
      ))
  ))
}
