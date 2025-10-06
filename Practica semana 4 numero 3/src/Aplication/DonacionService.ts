import { DonacionRepository } from "../Infraestructure/repositories/DonacionRepository";
import { Donacion, CreadorDeDonacion } from "../Domain/entities/donacion";
import { DonacionCreador, DonacionUpdate } from "../Domain/repositories/idonacion";

export class DonacionService {
    private donacionRepository: DonacionRepository;

    constructor() {
        this.donacionRepository = new DonacionRepository();
    }

    async create(donacionData: DonacionCreador): Promise<Donacion> {
        return new Promise((resolve, reject) => {
            this.donacionRepository.insert(donacionData, (err, result) => {
                if (err) {
                    reject(err);
                } else if (result) {
                    resolve(result);
                } else {
                    reject(new Error('No se pudo crear la donación'));
                }
            });
        });
    }

    async findAll(): Promise<Donacion[]> {
        return await this.donacionRepository.findAll();
    }

    async findOne(id: string): Promise<Donacion | null> {
        return await this.donacionRepository.findById(id);
    }

    async update(id: string, updateData: DonacionUpdate): Promise<Donacion> {
        return await this.donacionRepository.update(id, updateData);
    }

    async remove(id: string): Promise<boolean> {
        return await this.donacionRepository.delete(id);
    }

    // Métodos específicos adicionales
    async findByUsuario(id_usuario: string): Promise<Donacion[]> {
        return await this.donacionRepository.findByUsuario(id_usuario);
    }

    async getTotalDonado(id_causa_urgente?: string): Promise<number> {
        return await this.donacionRepository.getTotalDonado(id_causa_urgente);
    }

    async getTotalDonadoPorUsuario(id_usuario: string): Promise<number> {
        return await this.donacionRepository.getTotalDonadoPorUsuario(id_usuario);
    }
}