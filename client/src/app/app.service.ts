import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IAnimal } from './interfaces/object.interface';

@Injectable()
export class AppService {
  constructor(private httpClient: HttpClient) { }

  public getAnimals(): Observable<IAnimal[]> {
    return this.httpClient.get<IAnimal[]>('http://localhost:80/api/animals');
  }

  public addAnimal(name: string, type: string): Observable<void> {
    return this.httpClient.post<void>('http://localhost:80/api/animal', {name, type});
  }

  public deleteAnimal(name: string): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:80/api/animal/${name}`);
  }
}
