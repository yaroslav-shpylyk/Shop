import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import {IAnimal, IAnimalPayload} from '../interfaces/animal.interface';

@Injectable()
export class AnimalService {
  private url = 'http://localhost:80/api';

  constructor(private httpClient: HttpClient) {}

  public createAnimal(animalPayload: IAnimalPayload): Observable<IAnimal> {
    return this.httpClient.post<IAnimal>(`${this.url}/animal`, animalPayload);
  }

  public deleteAnimal(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/animal/${id}`);
  }
}
