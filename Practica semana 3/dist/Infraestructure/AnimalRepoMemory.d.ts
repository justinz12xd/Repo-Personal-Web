import { IAnimalRepo, AnimalCreador, AnimalUpdate } from "../Domain/repositories/ianimal";
import { Animal } from "../Domain/entities/animal";
export declare class AnimalRepoMemory implements IAnimalRepo {
    private animals;
    constructor();
    private Animalestontos;
    insert(DatosAnimal: AnimalCreador, callback: (err: Error | null, result?: Animal) => void): void;
    findById(id: string): Promise<Animal | null>;
    findAll(): Promise<Animal[]>;
    update(id: string, data: AnimalUpdate): Promise<Animal>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=AnimalRepoMemory.d.ts.map