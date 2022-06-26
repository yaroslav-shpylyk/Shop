import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { IAnimal } from '../../interfaces/animal.interface';
import { animalsSelector } from '../../store/selectors/animals.selector';
import { getAnimals } from '../../store/actions/animals.action';
import { deleteAnimal } from '../../store/actions/animal.action';


@Component({
  selector: 'app-animals-table',
  templateUrl: './animals-table.component.html',
  styleUrls: ['./animals-table.component.scss']
})
export class AnimalsTableComponent implements OnInit {
  public columnNames = {
    name: 'Name',
    type: 'Type',
    actions: 'Actions'
  };
  public animals$ = this.store.select<IAnimal[]>(animalsSelector);

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getAnimals());
  }

  public deleteItem(id: number): void {
    this.store.dispatch(deleteAnimal({payload: id}));
  }
}
