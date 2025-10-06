import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { IAnimalRepo, AnimalCreador, AnimalUpdate } from "../../Domain/repositories/ianimal";
import { Animal as DomainAnimal } from "../../Domain/entities/animal";
import { Animal as RAnimal } from "../entities/ranimal";

export class AnimalRepository implements IAnimalRepo {
    private repository: Repository<RAnimal>;

    constructor() {
        this.repository = AppDataSource.getRepository(RAnimal);
    }

    insert(animal: AnimalCreador, callback: (err: Error | null, result?: DomainAnimal) => void): void {
        this.createAnimal(animal)
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async findById(id: string): Promise<DomainAnimal | null> {
        const animal = await this.repository.findOne({
            where: { id_animal: id },
            relations: ["especie", "refugio"]
        });
        return animal ? this.toDomainEntity(animal) : null;
    }

    async findAll(): Promise<DomainAnimal[]> {
        const animales = await this.repository.find({
            relations: ["especie", "refugio"]
        });
        return animales.map(this.toDomainEntity);
    }

    async update(id: string, data: AnimalUpdate): Promise<DomainAnimal> {
        await this.repository.update({ id_animal: id }, data);
        const updatedAnimal = await this.repository.findOne({
            where: { id_animal: id },
            relations: ["especie", "refugio"]
        });
        if (!updatedAnimal) {
            throw new Error(`Animal with id ${id} not found`);
        }
        return this.toDomainEntity(updatedAnimal);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete({ id_animal: id });
        return (result.affected ?? 0) > 0;
    }

    // Métodos adicionales específicos
    async findByEspecie(id_especie: string): Promise<DomainAnimal[]> {
        const animales = await this.repository.find({
            where: { id_especie },
            relations: ["especie", "refugio"]
        });
        return animales.map(animal => this.toDomainEntity(animal));
    }

    async findByRefugio(id_refugio: string): Promise<DomainAnimal[]> {
        const animales = await this.repository.find({
            where: { id_refugio },
            relations: ["especie", "refugio"]
        });
        return animales.map(animal => this.toDomainEntity(animal));
    }

    async findBySupervisor(id_supervisor: string): Promise<DomainAnimal[]> {
        const animales = await this.repository.find({
            where: { id_supervisor },
            relations: ["especie", "refugio"]
        });
        return animales.map(animal => this.toDomainEntity(animal));
    }

    async findByEstadoAdopcion(estado: string): Promise<DomainAnimal[]> {
        const animales = await this.repository.find({
            where: { estado_adopcion: estado },
            relations: ["especie", "refugio"]
        });
        return animales.map(animal => this.toDomainEntity(animal));
    }

    private async createAnimal(animalData: AnimalCreador): Promise<DomainAnimal> {
        const rAnimal = this.toInfrastructureEntity(animalData);
        const savedAnimal = await this.repository.save(rAnimal);
        return this.toDomainEntity(savedAnimal);
    }

    private toDomainEntity(rAnimal: RAnimal): DomainAnimal {
        const domainAnimal: DomainAnimal = {
            id_animal: rAnimal.id_animal,
            nombre: rAnimal.nombre,
            id_especie: rAnimal.id_especie,
            edad: rAnimal.edad,
            estado: rAnimal.estado,
            estado_adopcion: rAnimal.estado_adopcion,
            id_refugio: rAnimal.id_refugio
        };
        
        // Asignar propiedades opcionales solo si tienen valor
        if (rAnimal.descripcion) {
            domainAnimal.descripcion = rAnimal.descripcion;
        }
        if (rAnimal.fotos && rAnimal.fotos.length > 0) {
            domainAnimal.fotos = rAnimal.fotos;
        }
        
        return domainAnimal;
    }

    private toInfrastructureEntity(animal: AnimalCreador): RAnimal {
        const rAnimal = new RAnimal();
        rAnimal.nombre = animal.nombre;
        rAnimal.id_especie = animal.id_especie;
        rAnimal.edad = animal.edad;
        rAnimal.estado = animal.estado;
        rAnimal.estado_adopcion = animal.estado_adopcion;
        rAnimal.id_refugio = animal.id_refugio;
        
        // Asignar propiedades opcionales
        if (animal.descripcion) {
            rAnimal.descripcion = animal.descripcion;
        }
        if (animal.fotos) {
            rAnimal.fotos = animal.fotos;
        }
        
        return rAnimal;
    }
}