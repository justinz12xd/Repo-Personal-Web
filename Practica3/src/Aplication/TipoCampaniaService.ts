import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { TipoCampania } from "../Infraestructure/entities/rtipo_campania";

export class TipoCampaniaService {
    private repository: Repository<TipoCampania>;

    constructor() {
        this.repository = AppDataSource.getRepository(TipoCampania);
    }

    async create(nombre: string, descripcion?: string): Promise<TipoCampania> {
        const tipoCampania = new TipoCampania();
        tipoCampania.nombre = nombre;
        if (descripcion) tipoCampania.descripcion = descripcion;
        return await this.repository.save(tipoCampania);
    }

    async findAll(): Promise<TipoCampania[]> {
        return await this.repository.find();
    }

    async findByNombre(nombre: string): Promise<TipoCampania | null> {
        return await this.repository.findOne({ where: { nombre } });
    }
}