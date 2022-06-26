import { createSelector } from '@ngrx/store';

export const animalSelector = createSelector((state: any) => state.animals, (animals: any, {name}: {name: string}) => {
  return animals.find((animal: any) => animal.name === name);
});
