import { Donacion } from "../entities/donacion";

export interface DonacionCreador {
  tipo_donacion: string;
  descripcion: string;
  cantidad: number;
  moneda: string;
  fecha_donacion: Date;
  donante: string;
  beneficiario: string;
  metodo_pago: string;
  estado: 'pendiente' | 'completada' | 'cancelada';
  anonima: boolean;
}

export interface DonacionUpdate {
  tipo_donacion?: string;
  descripcion?: string;
  cantidad?: number;
  moneda?: string;
  fecha_donacion?: Date;
  donante?: string;
  beneficiario?: string;
  metodo_pago?: string;
  estado?: 'pendiente' | 'completada' | 'cancelada';
  anonima?: boolean;
}

export interface IDonacionRepo {
  insert(donacion: DonacionCreador, callback: (err: Error | null, result?: Donacion) => void): void;
  findById(id: string): Promise<Donacion | null>;
  findAll(): Promise<Donacion[]>;
  update(id: string, data: DonacionUpdate): Promise<Donacion>;
  delete(id: string): Promise<boolean>;
  
  // Métodos adicionales específicos para donaciones
  findByDonante(donante: string): Promise<Donacion[]>;
  findByBeneficiario(beneficiario: string): Promise<Donacion[]>;
  findByEstado(estado: 'pendiente' | 'completada' | 'cancelada'): Promise<Donacion[]>;
  findByFechaRango(fechaInicio: Date, fechaFin: Date): Promise<Donacion[]>;
  getTotalDonado(beneficiario?: string): Promise<number>;
  getDonacionesAnonimas(): Promise<Donacion[]>;
}