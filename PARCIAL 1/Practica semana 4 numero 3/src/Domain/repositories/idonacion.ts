import { Donacion } from "../entities/donacion";

export interface DonacionCreador {
  monto: number;
  id_usuario: string;
  id_causa_urgente?: string;
}

export interface DonacionUpdate {
  monto?: number;
}

export interface IDonacionRepo {
  insert(donacion: DonacionCreador, callback: (err: Error | null, result?: Donacion) => void): void;
  findById(id: string): Promise<Donacion | null>;
  findAll(): Promise<Donacion[]>;
  update(id: string, data: DonacionUpdate): Promise<Donacion>;
  delete(id: string): Promise<boolean>;
  
  // Métodos adicionales específicos para donaciones
  findByUsuario(id_usuario: string): Promise<Donacion[]>;
  findByCausaUrgente(id_causa_urgente: string): Promise<Donacion[]>;
  findByFechaRango(fechaInicio: Date, fechaFin: Date): Promise<Donacion[]>;
  getTotalDonado(id_causa_urgente?: string): Promise<number>;
  getTotalDonadoPorUsuario(id_usuario: string): Promise<number>;
}