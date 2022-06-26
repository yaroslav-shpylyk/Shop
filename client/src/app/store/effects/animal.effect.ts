import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs';

import { AnimalService } from '../../services/animal.service';
import * as animalActions from '../actions/animal.action';
import { IProps } from '../../interfaces/props.interface';
import {IAnimal, IAnimalPayload} from '../../interfaces/animal.interface';

@Injectable()
export class AnimalEffect {
  constructor(
    private actions$: Actions,
    private animalService: AnimalService
  ) {}

  createAnimal$ = createEffect(() => this.actions$.pipe(
    ofType(animalActions.createAnimal),
    switchMap((props: IProps<IAnimalPayload>) => this.animalService.createAnimal(props.payload)
      .pipe(
        map((animal: IAnimal) => animalActions.createAnimalSuccess({payload: animal}))
      ))
  ))

  deleteAnimal$ = createEffect(() => this.actions$.pipe(
    ofType(animalActions.deleteAnimal),
    switchMap((props: IProps<number>) => this.animalService.deleteAnimal(props.payload)
      .pipe(
        map(() => animalActions.deleteAnimalSuccess(props))
      ))
  ))
}
