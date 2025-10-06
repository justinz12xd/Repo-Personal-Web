export interface Animal {
    id_animal: string;
    nombre: string;
    id_especie: string;
    edad: string;
    estado: string;
    descripcion?: string;
    fotos?: string[];
    estado_adopcion: string;
    id_refugio: string;
}
export declare function CreadorDeAnimal(data: Omit<Animal, "id_animal">): Animal;
//# sourceMappingURL=animal.d.ts.map