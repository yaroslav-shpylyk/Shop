import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AnimalService {
  private url = 'http://localhost:80/api';
  constructor(private httpClient: HttpClient) {}

  public addAnimal(name: string, type: string): Observable<void> {
    return this.httpClient.post<void>(`${this.url}/animal`, {name, type});
  }

  public deleteAnimal(name: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/animal/${name}`);
  }
}
