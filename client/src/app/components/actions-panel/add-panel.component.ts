import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';

import { debounceTime, map, Observable, Subject, take, takeUntil } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as animalsActions from '../../store/actions/animals.action';
import * as animalActions from '../../store/actions/animal.action';
import { AnimalService } from '../../services/animal.service';
import { AnimalsService } from '../../services/animals.service';
import { IAnimal } from '../../interfaces/animal.interface';
import { animalSelector } from '../../store/selectors/animal.selector';


@Component({
  selector: 'app-actions-panel',
  templateUrl: './add-panel.component.html',
  styleUrls: ['./add-panel.component.scss']
})
export class AddPanelComponent implements OnInit, OnDestroy {
  public isLoading: boolean;
  public addForm = new FormGroup({
    name: new FormControl('', [Validators.required], this.checkNameExistence()),
    type: new FormControl('', [Validators.required])
  })

  private destroy$ = new Subject<void>();

  constructor(
    private animalService: AnimalService,
    private animalsService: AnimalsService,
    private store: Store,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.actions$.pipe(
      ofType(animalsActions.getAnimals, animalActions.createAnimal),
      takeUntil(this.destroy$)
    ).subscribe(() => this.isLoading = true);
    this.actions$.pipe(
      ofType(animalsActions.getAnimalsSuccess, animalActions.createAnimalSuccess),
      debounceTime(1000),
      takeUntil(this.destroy$)
    ).subscribe(() => this.isLoading = false);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public clearAll() : void {
    this.addForm.patchValue({
      name: '',
      type: ''
    })
  }

  public addObject(): void {
    const {name, type} = this.addForm.controls;
    this.store.dispatch(animalActions.createAnimal({
      payload: {
        name: name.value as string,
        type: type.value as string
      }
    }));
  }

  private checkNameExistence(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{nameExists: boolean} | null> => {
      return this.store.select<IAnimal[]>(animalSelector, {name: control.value})
        .pipe(
          take(1),
          map(animal => animal ? {nameExists: true} : null)
        )
    }
  }
}
