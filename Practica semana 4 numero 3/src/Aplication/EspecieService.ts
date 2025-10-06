import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Especie } from "../Infraestructure/entities/respecie";

export class EspecieService {
    private repository: Repository<Especie>;

    constructor() {
        this.repository = AppDataSource.getRepository(Especie);
    }

    async create(nombre: string): Promise<Especie> {
        const especie = new Especie();
        especie.nombre = nombre;
        return await this.repository.save(especie);
    }

    async findAll(): Promise<Especie[]> {
        return await this.repository.find();
    }

    async findByNombre(nombre: string): Promise<Especie | null> {
        return await this.repository.findOne({ where: { nombre } });
    }
}