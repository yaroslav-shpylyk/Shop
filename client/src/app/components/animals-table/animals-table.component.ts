import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

import { IAnimal } from '../../interfaces/animal.interface';
import { animalsSelector } from '../../store/selectors/animals.selector';
import * as animalsActions from '../../store/actions/animals.action';



@Component({
  selector: 'app-animals-table',
  templateUrl: './animals-table.component.html',
  styleUrls: ['./animals-table.component.scss']
})
export class AnimalsTableComponent implements OnInit, OnDestroy {
  public columnNames = {
    name: 'Name',
    type: 'Type',
    actions: 'Actions'
  };
  public animals$ = this.store.select<IAnimal[]>(animalsSelector);
  public editItemId: number | null;
  public editItemType: string;
  public editItemName: string;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.actions$.pipe(
      ofType(animalsActions.updateAnimalSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => this.cancelItemEdit());
    this.store.dispatch(animalsActions.getAnimals());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public deleteItem(id: number | null): void {
    if (this.editItemId !== null) {
      this.cancelItemEdit();
    }
    this.store.dispatch(id !== null ? animalsActions.deleteAnimal({payload: id}) : animalsActions.deleteAllAnimals());
  }

  public editItem(item: IAnimal): void {
    const {id, name, type} = item;
    this.editItemId = id;
    this.editItemName = name;
    this.editItemType = type;
  }

  public cancelItemEdit(): void {
    this.editItemId = null;
  }

  public saveItem(id: number): void {
    this.store.dispatch(animalsActions.updateAnimal({
      payload: {
        id,
        data: {
          name: this.editItemName,
          type: this.editItemType
        }
      }
    }));
  }
}
