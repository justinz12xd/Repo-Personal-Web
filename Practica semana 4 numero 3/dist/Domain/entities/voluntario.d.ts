export interface Voluntario {
    id_voluntario: string;
    rol: string;
    estado: string;
    id_usuario: string;
    id_campania: string;
}
export declare function CreadorDeVoluntario(data: Omit<Voluntario, 'id_voluntario'>): Voluntario;
//# sourceMappingURL=voluntario.d.ts.map