import { createSelector } from '@ngrx/store';

export const animalsSelector = createSelector((state: any) => state.animals, animals => animals);
export const animalSelectorById = createSelector((state: any) => state.animals, (animals: any, {name}: {name: string}) => {
  return animals.find((animal: any) => animal.name === name);
});
