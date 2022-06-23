import { createAction } from '@ngrx/store';

enum EAnimalsActions {
  GET_ANIMALS = '[Animals] Get Animals'
}

export const getAnimals = createAction(EAnimalsActions.GET_ANIMALS);
