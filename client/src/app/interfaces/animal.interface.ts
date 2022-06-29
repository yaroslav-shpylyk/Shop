export interface IAnimalPayload {
  name: string;
  type: string;
}

export interface IAnimal extends IAnimalPayload {
  id: number;
}
