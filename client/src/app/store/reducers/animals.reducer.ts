import { createReducer, on } from '@ngrx/store';

import * as animalsActions from '../actions/animals.action';
import { IAnimal, IAnimalPayload } from '../../interfaces/animal.interface';
import { IProps } from '../../interfaces/props.interface';

export const animalsReducer = createReducer(
  [] as IAnimal[],
  on(animalsActions.getAnimalsSuccess, (state, {payload}: IProps<IAnimal[]>) => [...payload]),
  on(animalsActions.getAnimalsFail, () => []),
  on(animalsActions.createAnimalSuccess, (state, {payload}: IProps<IAnimal>) => {
    const newState = [...state];

    newState.push(payload);

    return newState;
  }),
  on(animalsActions.updateAnimalSuccess, (state, props: IProps<{id: number, data: IAnimalPayload}>) => {
    const {id, data} = props.payload;
    const index = state.findIndex(item => item.id === id);
    const newState = [...state];

    newState[index] = {
      ...newState[index],
      ...data
    }

    return newState;
  }),
  on(animalsActions.deleteAnimalSuccess, (state, {payload}: IProps<number>) => {
    const deletedItemIndex = state.findIndex(item => item.id === payload);
    const newState = [...state];

    newState.splice(deletedItemIndex, 1);

    return newState;
  }),
  on(animalsActions.deleteAllAnimalsSuccess, () => [])
);
