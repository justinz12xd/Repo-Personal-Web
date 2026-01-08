export interface Animal {
    id: string;
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
export declare function CreadorDeAnimal(data: Omit<Animal, "id">): Animal;
//# sourceMappingURL=animal.d.ts.map