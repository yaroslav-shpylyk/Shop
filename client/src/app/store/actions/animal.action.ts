import { createAction, props } from '@ngrx/store';

import { IAnimal, IAnimalPayload } from '../../interfaces/animal.interface';
import { IProps } from '../../interfaces/props.interface';

enum AnimalAction {
  CREATE = '[Animal] Create',
  CREATE_SUCCESS = '[Animal] Create Success',
  DELETE = '[Animal] Delete',
  DELETE_SUCCESS = `[Animal] Delete Success`
}

export const createAnimal = createAction(AnimalAction.CREATE, props<IProps<IAnimalPayload>>());
export const createAnimalSuccess = createAction(AnimalAction.CREATE_SUCCESS, props<IProps<IAnimal>>());
export const deleteAnimal = createAction(AnimalAction.DELETE, props<IProps<number>>());
export const deleteAnimalSuccess = createAction(AnimalAction.DELETE_SUCCESS, props<IProps<number>>());
