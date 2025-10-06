import { CampaniaRepository } from "../Infraestructure/repositories/CampaniaRepository";
import { Campania, CreadorDeCampania } from "../Domain/entities/campania";
import { CampaniaCreador, CampaniaUpdate } from "../Domain/repositories/icampania";

export class CampaniaService {
    private campaniaRepository: CampaniaRepository;

    constructor() {
        this.campaniaRepository = new CampaniaRepository();
    }

    async create(campaniaData: CampaniaCreador): Promise<Campania> {
        return new Promise((resolve, reject) => {
            this.campaniaRepository.insert(campaniaData, (err, result) => {
                if (err) {
                    reject(err);
                } else if (result) {
                    resolve(result);
                } else {
                    reject(new Error('No se pudo crear la campaña'));
                }
            });
        });
    }

    async findAll(): Promise<Campania[]> {
        return await this.campaniaRepository.findAll();
    }

    async findOne(id: string): Promise<Campania | null> {
        return await this.campaniaRepository.findById(id);
    }

    async update(id: string, updateData: CampaniaUpdate): Promise<Campania> {
        return await this.campaniaRepository.update(id, updateData);
    }

    async remove(id: string): Promise<boolean> {
        return await this.campaniaRepository.delete(id);
    }

    // Métodos específicos adicionales
    async findActivas(): Promise<Campania[]> {
        return await this.campaniaRepository.findActivas();
    }

    async findByEstado(estado: string): Promise<Campania[]> {
        return await this.campaniaRepository.findByEstado(estado);
    }
}