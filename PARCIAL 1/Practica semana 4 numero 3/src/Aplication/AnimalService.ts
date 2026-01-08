import { AnimalRepository } from "../Infraestructure/repositories/AnimalRepository";
import { Animal, CreadorDeAnimal } from "../Domain/entities/animal";
import { AnimalCreador, AnimalUpdate } from "../Domain/repositories/ianimal";

export class AnimalService {
    private animalRepository: AnimalRepository;

    constructor() {
        this.animalRepository = new AnimalRepository();
    }

    async create(animalData: AnimalCreador): Promise<Animal> {
        return new Promise((resolve, reject) => {
            this.animalRepository.insert(animalData, (err, result) => {
                if (err) {
                    reject(err);
                } else if (result) {
                    resolve(result);
                } else {
                    reject(new Error('No se pudo crear el animal'));
                }
            });
        });
    }

    async findAll(): Promise<Animal[]> {
        return await this.animalRepository.findAll();
    }

    async findOne(id: string): Promise<Animal | null> {
        return await this.animalRepository.findById(id);
    }

    async update(id: string, updateData: AnimalUpdate): Promise<Animal> {
        return await this.animalRepository.update(id, updateData);
    }

    async remove(id: string): Promise<boolean> {
        return await this.animalRepository.delete(id);
    }

    // Métodos específicos adicionales
    async findByEspecie(id_especie: string): Promise<Animal[]> {
        return await this.animalRepository.findByEspecie(id_especie);
    }

    async findByRefugio(id_refugio: string): Promise<Animal[]> {
        return await this.animalRepository.findByRefugio(id_refugio);
    }

    async findByEstadoAdopcion(estado: string): Promise<Animal[]> {
        return await this.animalRepository.findByEstadoAdopcion(estado);
    }
}