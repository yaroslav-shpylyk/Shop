import { createAction, props } from '@ngrx/store';

import { IAnimal, IAnimalPayload } from '../../interfaces/animal.interface';
import { IProps } from '../../interfaces/props.interface';

enum EAnimalsActions {
  GET = '[Animals] Get',
  GET_SUCCESS = '[Animals] Get Success',
  GET_FAIL = '[Animals] Get Fail',
  CREATE = '[Animals] Create',
  CREATE_SUCCESS = '[Animals] Create Success',
  UPDATE = '[Animals] Update',
  UPDATE_SUCCESS = '[Animals] Update Success',
  DELETE = '[Animals] Delete',
  DELETE_SUCCESS = `[Animals] Delete Success`,
  DELETE_ALL = '[Animals] Delete All',
  DELETE_ALL_SUCCESS = '[Animals] Delete All Success'
}

export const getAnimals = createAction(EAnimalsActions.GET);
export const getAnimalsSuccess = createAction(EAnimalsActions.GET_SUCCESS, props<IProps<IAnimal[]>>());
export const getAnimalsFail = createAction(EAnimalsActions.GET_FAIL);
export const createAnimal = createAction(EAnimalsActions.CREATE, props<IProps<IAnimalPayload>>());
export const createAnimalSuccess = createAction(EAnimalsActions.CREATE_SUCCESS, props<IProps<IAnimal>>());
export const updateAnimal = createAction(EAnimalsActions.UPDATE, props<IProps<{id: number, data: IAnimalPayload}>>());
export const updateAnimalSuccess = createAction(EAnimalsActions.UPDATE_SUCCESS, props<IProps<{id: number, data: IAnimalPayload}>>());
export const deleteAnimal = createAction(EAnimalsActions.DELETE, props<IProps<number>>());
export const deleteAnimalSuccess = createAction(EAnimalsActions.DELETE_SUCCESS, props<IProps<number>>());
export const deleteAllAnimals = createAction(EAnimalsActions.DELETE_ALL);
export const deleteAllAnimalsSuccess = createAction(EAnimalsActions.DELETE_ALL_SUCCESS);
