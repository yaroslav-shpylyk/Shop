import { createAction, props } from '@ngrx/store';

import { IAnimal } from '../../interfaces/animal.interface';

enum EAnimalsActions {
  GET_ANIMALS = '[Animals] Get Animals',
  GET_ANIMALS_SUCCESS = '[Animals] Get Animals Success'
}

export const getAnimals = createAction(EAnimalsActions.GET_ANIMALS);
export const getAnimalsSuccess = createAction(EAnimalsActions.GET_ANIMALS_SUCCESS, props<{payload: IAnimal[]}>());
