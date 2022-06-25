import { createReducer, on } from '@ngrx/store';

import * as AnimalsActions from '../actions/animals.action';
import { IAnimal } from '../../interfaces/animal.interface';

export const animalsReducer = createReducer(
  [] as IAnimal[],
  on(AnimalsActions.getAnimalsSuccess, (state, {payload}) => {
    return [...payload];
  })
);
