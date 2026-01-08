"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalRepository = void 0;
const data_source_1 = require("../../data-source");
const ranimal_1 = require("../entities/ranimal");
class AnimalRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(ranimal_1.Animal);
    }
    insert(animal, callback) {
        this.createAnimal(animal)
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }
    async findById(id) {
        const animal = await this.repository.findOne({
            where: { id_animal: id },
            relations: ["especie", "refugio"]
        });
        return animal ? this.toDomainEntity(animal) : null;
    }
    async findAll() {
        const animales = await this.repository.find({
            relations: ["especie", "refugio"]
        });
        return animales.map(this.toDomainEntity);
    }
    async update(id, data) {
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
    async delete(id) {
        const result = await this.repository.delete({ id_animal: id });
        return (result.affected ?? 0) > 0;
    }
    // Métodos adicionales específicos
    async findByEspecie(id_especie) {
        const animales = await this.repository.find({
            where: { id_especie },
            relations: ["especie", "refugio"]
        });
        return animales.map(animal => this.toDomainEntity(animal));
    }
    async findByRefugio(id_refugio) {
        const animales = await this.repository.find({
            where: { id_refugio },
            relations: ["especie", "refugio"]
        });
        return animales.map(animal => this.toDomainEntity(animal));
    }
    async findBySupervisor(id_supervisor) {
        const animales = await this.repository.find({
            where: { id_supervisor },
            relations: ["especie", "refugio"]
        });
        return animales.map(animal => this.toDomainEntity(animal));
    }
    async findByEstadoAdopcion(estado) {
        const animales = await this.repository.find({
            where: { estado_adopcion: estado },
            relations: ["especie", "refugio"]
        });
        return animales.map(animal => this.toDomainEntity(animal));
    }
    async createAnimal(animalData) {
        const rAnimal = this.toInfrastructureEntity(animalData);
        const savedAnimal = await this.repository.save(rAnimal);
        return this.toDomainEntity(savedAnimal);
    }
    toDomainEntity(rAnimal) {
        const domainAnimal = {
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
    toInfrastructureEntity(animal) {
        const rAnimal = new ranimal_1.Animal();
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
exports.AnimalRepository = AnimalRepository;
//# sourceMappingURL=AnimalRepository.js.map