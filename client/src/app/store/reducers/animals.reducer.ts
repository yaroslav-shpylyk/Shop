import { createReducer, on } from '@ngrx/store';

import * as animalsActions from '../actions/animals.action';
import * as animalActions from '../actions/animal.action'
import { IAnimal } from '../../interfaces/animal.interface';
import { IProps } from '../../interfaces/props.interface';

export const animalsReducer = createReducer(
  [] as IAnimal[],
  on(animalsActions.getAnimalsSuccess, (state, {payload}: IProps<IAnimal[]>) => [...payload]),
  on(animalActions.createAnimalSuccess, (state, {payload}: IProps<IAnimal>) => {
    const newState = [...state];

    newState.push(payload);

    return newState;
  }),
  on(animalActions.deleteAnimalSuccess, (state, {payload}: IProps<number>) => {
    const deletedItemIndex = state.findIndex(item => item.id === payload);
    const newState = [...state];

    newState.splice(deletedItemIndex, 1);

    return newState;
  })
);
