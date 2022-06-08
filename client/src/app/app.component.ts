import { Component, OnInit } from '@angular/core';

import {BehaviorSubject, debounceTime, finalize, switchMap} from 'rxjs';

import { IAnimal } from './interfaces/object.interface';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public nameModel: string;
  public typeModel: string;
  public animals: IAnimal[] = [];
  public message$ = new BehaviorSubject<string>('');
  public isLoading: boolean;
  public isAddViewSelected = true;

  constructor(private AppService: AppService) {}

  ngOnInit() {
    this.isLoading = true;
    this.AppService.getAnimals()
      .pipe(
        debounceTime(1000),
        finalize(() => this.isLoading = false)
      )
      .subscribe(allObjects => {
        this.assignAnimals(allObjects);
      });
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
    this.AppService.addAnimal(name, type)
      .pipe(
        switchMap(() => this.AppService.getAnimals()),
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

    this.AppService.deleteAnimal(name)
      .pipe(
        switchMap(() => this.AppService.getAnimals()),
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
    this.animals = animals;
  }

  private checkNameExistence(name: string): boolean {
    return this.animals.some(animal => animal.name === name);
  }

  private setNewMessage(message: string): void {
    this.message$.next(message);
    setTimeout(() => this.message$.next(''), 3000);
  }
}
