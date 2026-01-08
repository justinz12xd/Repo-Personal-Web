import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Refugio } from "../Infraestructure/entities/rrefugio";

export class RefugioService {
    private repository: Repository<Refugio>;

    constructor() {
        this.repository = AppDataSource.getRepository(Refugio);
    }

    async create(nombre: string, direccion?: string, telefono?: string, descripcion?: string): Promise<Refugio> {
        const refugio = new Refugio();
        refugio.nombre = nombre;
        if (direccion) refugio.direccion = direccion;
        if (telefono) refugio.telefono = telefono;
        if (descripcion) refugio.descripcion = descripcion;
        return await this.repository.save(refugio);
    }

    async findAll(): Promise<Refugio[]> {
        return await this.repository.find();
    }

    async findByNombre(nombre: string): Promise<Refugio | null> {
        return await this.repository.findOne({ where: { nombre } });
    }
}