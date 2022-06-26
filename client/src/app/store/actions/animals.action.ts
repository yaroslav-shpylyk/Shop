import { createAction, props } from '@ngrx/store';

import { IAnimal } from '../../interfaces/animal.interface';
import { IProps } from '../../interfaces/props.interface';

enum EAnimalsActions {
  GET = '[Animals] Get',
  GET_SUCCESS = '[Animals] Get Success'
}

export const getAnimals = createAction(EAnimalsActions.GET);
export const getAnimalsSuccess = createAction(EAnimalsActions.GET_SUCCESS, props<IProps<IAnimal[]>>());
