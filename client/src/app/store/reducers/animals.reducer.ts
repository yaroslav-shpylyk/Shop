import { createReducer, on } from '@ngrx/store';

import { getAnimals } from '../actions/animals.action';
import { IAnimal } from '../../interfaces/animal.interface';

export const animalsReducer = createReducer(
  [] as IAnimal[],
  on(getAnimals, () => {
    return [{
      id: 0,
      name: 'sss',
      type: 'ssss'
    }];
  })
);
