import { Animal } from "../entities/animal";

// Ajustado a la interfaz de dominio Animal (ver src/Domain/entities/animal.ts)
export interface AnimalCreador {
  nombre: string;
  edad: string;
  estado: string;
  descripcion?: string;
  fotos?: string[];
  estado_adopcion: string;
  id_especie: string;
  id_refugio: string;
  id_supervisor?: string;
}

export interface AnimalUpdate {
  nombre?: string;
  edad?: string;
  estado?: string;
  descripcion?: string;
  fotos?: string[];
  estado_adopcion?: string;
  id_especie?: string;
  id_refugio?: string;
  id_supervisor?: string;
}

export interface IAnimalRepo {
  insert(animal: AnimalCreador, callback: (err: Error | null, result?: Animal) => void): void;
  findById(id: string): Promise<Animal | null>;
  findAll(): Promise<Animal[]>;
  update(id: string, data: AnimalUpdate): Promise<Animal>; 
  delete(id: string): Promise<boolean>;
  
  // Métodos adicionales específicos
  findByEspecie(id_especie: string): Promise<Animal[]>;
  findByRefugio(id_refugio: string): Promise<Animal[]>;
  findBySupervisor(id_supervisor: string): Promise<Animal[]>;
  findByEstadoAdopcion(estado: string): Promise<Animal[]>;
}