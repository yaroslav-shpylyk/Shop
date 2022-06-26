import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as animalsActions from '../../store/actions/animals.action';
import * as animalActions from '../../store/actions/animal.action';
import { AnimalService } from '../../services/animal.service';
import { AnimalsService } from '../../services/animals.service';


@Component({
  selector: 'app-actions-panel',
  templateUrl: './actions-panel.component.html',
  styleUrls: ['./actions-panel.component.scss']
})
export class ActionsPanelComponent implements OnInit, OnDestroy {
  public nameModel: string;
  public typeModel: string;
  public message$ = new BehaviorSubject<string>('');
  public isLoading: boolean;

  private messageTimer: ReturnType<typeof setTimeout>;
  private destroy$ = new Subject<void>();

  constructor(
    private animalService: AnimalService,
    private animalsService: AnimalsService,
    private store: Store,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.actions$.pipe(
      ofType(animalsActions.getAnimalsSuccess),
      takeUntil(this.destroy$)
    ).subscribe(() => this.isLoading = false);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public addObject(name: string, type: string): void {
    if(!name) {
      this.setNewMessage('Name is empty');
      return;
    } else if (!type) {
      this.setNewMessage('Type is empty');
      return;
    } else if (this.checkNameExistence(name)) {
      this.setNewMessage('Animal with this name already exists');
      return;
    }

    this.store.dispatch(animalActions.createAnimal({payload: {name, type}}))
  }

  private checkNameExistence(name: string): boolean {
    return false;
  }

  private setNewMessage(message: string): void {
    clearTimeout(this.messageTimer);
    this.message$.next(message);
    this.messageTimer = setTimeout(() => this.message$.next(''), 3000);
  }

}
