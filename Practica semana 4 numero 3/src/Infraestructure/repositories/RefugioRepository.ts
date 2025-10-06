import { Repository, Like } from "typeorm";
import { AppDataSource } from "../../data-source";
import { IRefugioRepo, RefugioCreador, RefugioUpdate } from "../../Domain/repositories/irefugio";
import { Refugio as DomainRefugio } from "../../Domain/entities/refugio";
import { Refugio as RRefugio } from "../entities/rrefugio";

export class RefugioRepository implements IRefugioRepo {
    private repository: Repository<RRefugio>;

    constructor() {
        this.repository = AppDataSource.getRepository(RRefugio);
    }

    insert(refugio: RefugioCreador, callback: (err: Error | null, result?: DomainRefugio) => void): void {
        this.createRefugio(refugio)
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async findById(id: string): Promise<DomainRefugio | null> {
        const refugio = await this.repository.findOne({
            where: { id_refugio: id }
        });
        return refugio ? this.toDomainEntity(refugio) : null;
    }

    async findAll(): Promise<DomainRefugio[]> {
        const refugios = await this.repository.find();
        return refugios.map(this.toDomainEntity);
    }

    async update(id: string, data: RefugioUpdate): Promise<DomainRefugio> {
        await this.repository.update({ id_refugio: id }, data);
        const updatedRefugio = await this.repository.findOne({
            where: { id_refugio: id }
        });
        if (!updatedRefugio) {
            throw new Error(`Refugio with id ${id} not found`);
        }
        return this.toDomainEntity(updatedRefugio);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete({ id_refugio: id });
        return (result.affected ?? 0) > 0;
    }

    async findByNombre(nombre: string): Promise<DomainRefugio | null> {
        const refugio = await this.repository.findOne({
            where: { nombre }
        });
        return refugio ? this.toDomainEntity(refugio) : null;
    }

    async findByDireccion(direccion: string): Promise<DomainRefugio[]> {
        const refugios = await this.repository.find({
            where: { direccion: Like(`%${direccion}%`) }
        });
        return refugios.map(this.toDomainEntity);
    }

    private async createRefugio(refugioData: RefugioCreador): Promise<DomainRefugio> {
        const rRefugio = this.toInfrastructureEntity(refugioData);
        const savedRefugio = await this.repository.save(rRefugio);
        return this.toDomainEntity(savedRefugio);
    }

    private toDomainEntity(rRefugio: RRefugio): DomainRefugio {
        const domainRefugio: DomainRefugio = {
            id_refugio: rRefugio.id_refugio,
            nombre: rRefugio.nombre
        };

        if (rRefugio.direccion) {
            domainRefugio.direccion = rRefugio.direccion;
        }
        if (rRefugio.telefono) {
            domainRefugio.telefono = rRefugio.telefono;
        }
        if (rRefugio.descripcion) {
            domainRefugio.descripcion = rRefugio.descripcion;
        }

        return domainRefugio;
    }

    private toInfrastructureEntity(refugio: RefugioCreador): RRefugio {
        const rRefugio = new RRefugio();
        rRefugio.nombre = refugio.nombre;

        if (refugio.direccion) {
            rRefugio.direccion = refugio.direccion;
        }
        if (refugio.telefono) {
            rRefugio.telefono = refugio.telefono;
        }
        if (refugio.descripcion) {
            rRefugio.descripcion = refugio.descripcion;
        }

        return rRefugio;
    }
}
