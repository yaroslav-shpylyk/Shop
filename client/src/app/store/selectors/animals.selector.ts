import { createSelector } from '@ngrx/store';

export const animalsSelector = createSelector((state: any) => state.animals, animals => animals);
