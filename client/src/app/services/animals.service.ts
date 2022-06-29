import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IAnimal, IAnimalPayload } from '../interfaces/animal.interface';

@Injectable()
export class AnimalsService {
  private url = 'http://localhost:80/api';

  constructor(private httpClient: HttpClient) {}

  public getAnimals(): Observable<IAnimal[]> {
    return this.httpClient.get<IAnimal[]>(`${this.url}/animals`);
  }

  public createAnimal(payload: IAnimalPayload): Observable<IAnimal> {
    return this.httpClient.post<IAnimal>(`${this.url}/animals`, payload);
  }

  public updateAnimal(id: number, payload: IAnimalPayload): Observable<void> {
    return this.httpClient.patch<void>(`${this.url}/animals/${id}`, payload);
  }

  public deleteAnimal(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/animals/${id}`);
  }

  public deleteAllAnimals(): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/animals`);
  }
}
