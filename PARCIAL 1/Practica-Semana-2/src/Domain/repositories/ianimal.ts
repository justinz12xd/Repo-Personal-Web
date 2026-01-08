import { Animal } from "../entities/animal";

export interface AnimalCreador{
  nombre: string;
  especie: string;
  edad: number;
  estado: string;
  vacunas: string[];
  descripcion: string;
  fotos: string[];
  estadoAdopcion: string;
  id_refugio: string;
}

export interface AnimalUpdate{
  nombre?: string;
  especie?: string;
  edad?: number;
  estado?: string;
  vacunas?: string[];
  descripcion?: string;
  fotos?: string[];
  estadoAdopcion?: string;
  id_refugio?: string;
}


export interface IAnimalRepo {
  insert(animal: AnimalCreador, callback: (err: Error | null, result?: Animal) => void): void; 
  findById(id: string): Promise<Animal | null>; 
  findAll(): Promise<Animal[]>;
  update(id: string, data: AnimalUpdate): Promise<Animal>; 
  delete(id: string): Promise<boolean>; 
}