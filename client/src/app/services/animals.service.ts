import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IAnimal } from '../interfaces/animal.interface';

@Injectable()
export class AnimalsService {
  private url = 'http://localhost:80/api';

  constructor(private httpClient: HttpClient) {}

  public getAnimals(): Observable<IAnimal[]> {
    return this.httpClient.get<IAnimal[]>(`${this.url}/animals`);
  }
}
