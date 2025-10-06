export interface CausaUrgente {
    id_causa_urgente: string;
    titulo: string;
    descripcion?: string;
    meta: number;
    fecha_limite: Date;
    id_refugio?: string;
    id_animal?: string;
}
export declare function CreadorDeCausaUrgente(data: Omit<CausaUrgente, 'id_causa_urgente'>): CausaUrgente;
//# sourceMappingURL=causa_urgente.d.ts.map