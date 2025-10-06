import { IAnimalRepo, AnimalCreador, AnimalUpdate } from "../../Domain/repositories/ianimal";
import { Animal as DomainAnimal } from "../../Domain/entities/animal";
export declare class AnimalRepository implements IAnimalRepo {
    private repository;
    constructor();
    insert(animal: AnimalCreador, callback: (err: Error | null, result?: DomainAnimal) => void): void;
    findById(id: string): Promise<DomainAnimal | null>;
    findAll(): Promise<DomainAnimal[]>;
    update(id: string, data: AnimalUpdate): Promise<DomainAnimal>;
    delete(id: string): Promise<boolean>;
    findByEspecie(id_especie: string): Promise<DomainAnimal[]>;
    findByRefugio(id_refugio: string): Promise<DomainAnimal[]>;
    findBySupervisor(id_supervisor: string): Promise<DomainAnimal[]>;
    findByEstadoAdopcion(estado: string): Promise<DomainAnimal[]>;
    private createAnimal;
    private toDomainEntity;
    private toInfrastructureEntity;
}
//# sourceMappingURL=AnimalRepository.d.ts.map