import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, debounceTime, finalize, Subject, switchMap, takeUntil } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as animalsActions from '../../store/actions/animals.action';
import { IAnimal } from '../../interfaces/animal.interface';
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
  public isAddViewSelected = true;

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

    this.isLoading = true;
    this.animalService.addAnimal(name, type)
      .pipe(
        switchMap(() => this.animalsService.getAnimals()),
        debounceTime(1000),
        finalize(() => this.isLoading = false)
      )
      .subscribe(animals => {
        this.assignAnimals(animals);
        this.setNewMessage(`Animal with name ${name} and ${type} has been created`);
      });
  }

  public deleteObject(name: string): void {
    if(!name) {
      this.setNewMessage('Name is empty');
      return;
    } else if(!this.checkNameExistence(name)) {
      this.setNewMessage('Name does not exist in list');
      return;
    }

    this.animalService.deleteAnimal(name)
      .pipe(
        switchMap(() => this.animalsService.getAnimals()),
        debounceTime(1000),
        finalize(() => this.isLoading = false)
      )
      .subscribe(animals => {
        this.assignAnimals(animals);
        this.setNewMessage(`Animal with name ${name} has been deleted`);
      });
  }

  public changeView(isAddViewSelected: boolean): void {
    this.isAddViewSelected = isAddViewSelected;
    this.nameModel = '';
    this.typeModel = '';
  }

  private assignAnimals(animals: IAnimal[]): void {
    //this.animals = animals;
  }

  private checkNameExistence(name: string): boolean {
    return true;
  }

  private setNewMessage(message: string): void {
    clearTimeout(this.messageTimer);
    this.message$.next(message);
    this.messageTimer = setTimeout(() => this.message$.next(''), 3000);
  }

}
