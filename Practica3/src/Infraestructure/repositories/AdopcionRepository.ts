import { Repository, Between } from "typeorm";
import { AppDataSource } from "../../data-source";
import { IAdopcionRepo, AdopcionCreador, AdopcionUpdate } from "../../Domain/repositories/iadopcion";
import { Adopcion as DomainAdopcion } from "../../Domain/entities/adopcion";
import { Adopcion as RAdopcion } from "../entities/radopcion";

export class AdopcionRepository implements IAdopcionRepo {
    private repository: Repository<RAdopcion>;

    constructor() {
        this.repository = AppDataSource.getRepository(RAdopcion);
    }

    insert(adopcion: AdopcionCreador, callback: (err: Error | null, result?: DomainAdopcion) => void): void {
        this.createAdopcion(adopcion)
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async findById(id: string): Promise<DomainAdopcion | null> {
        const adopcion = await this.repository.findOne({
            where: { id_adopcion: id },
            relations: ["publicacion", "usuario"]
        });
        return adopcion ? this.toDomainEntity(adopcion) : null;
    }

    async findAll(): Promise<DomainAdopcion[]> {
        const adopciones = await this.repository.find({
            relations: ["publicacion", "usuario"]
        });
        return adopciones.map(this.toDomainEntity);
    }

    async update(id: string, data: AdopcionUpdate): Promise<DomainAdopcion> {
        await this.repository.update({ id_adopcion: id }, data);
        const updatedAdopcion = await this.repository.findOne({
            where: { id_adopcion: id },
            relations: ["publicacion", "usuario"]
        });
        if (!updatedAdopcion) {
            throw new Error(`Adopcion with id ${id} not found`);
        }
        return this.toDomainEntity(updatedAdopcion);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete({ id_adopcion: id });
        return (result.affected ?? 0) > 0;
    }

    async findByUsuario(id_usuario: string): Promise<DomainAdopcion[]> {
        const adopciones = await this.repository.find({
            where: { id_usuario },
            relations: ["publicacion", "usuario"]
        });
        return adopciones.map(this.toDomainEntity);
    }

    async findByPublicacion(id_publicacion: string): Promise<DomainAdopcion[]> {
        const adopciones = await this.repository.find({
            where: { id_publicacion },
            relations: ["publicacion", "usuario"]
        });
        return adopciones.map(this.toDomainEntity);
    }

    async findByEstado(estado: string): Promise<DomainAdopcion[]> {
        const adopciones = await this.repository.find({
            where: { estado },
            relations: ["publicacion", "usuario"]
        });
        return adopciones.map(this.toDomainEntity);
    }

    async findByFechaRango(fechaInicio: Date, fechaFin: Date): Promise<DomainAdopcion[]> {
        const adopciones = await this.repository.find({
            where: {
                fecha_adopcion: Between(fechaInicio, fechaFin)
            },
            relations: ["publicacion", "usuario"]
        });
        return adopciones.map(this.toDomainEntity);
    }

    async countAdopcionesByUsuario(id_usuario: string): Promise<number> {
        return await this.repository.count({
            where: { id_usuario }
        });
    }

    private async createAdopcion(adopcionData: AdopcionCreador): Promise<DomainAdopcion> {
        const rAdopcion = this.toInfrastructureEntity(adopcionData);
        const savedAdopcion = await this.repository.save(rAdopcion);
        return this.toDomainEntity(savedAdopcion);
    }

    private toDomainEntity(rAdopcion: RAdopcion): DomainAdopcion {
        return {
            id_adopcion: rAdopcion.id_adopcion,
            fecha_adopcion: rAdopcion.fecha_adopcion,
            estado: rAdopcion.estado,
            id_publicacion: rAdopcion.id_publicacion,
            id_usuario: rAdopcion.id_usuario
        };
    }

    private toInfrastructureEntity(adopcion: AdopcionCreador): RAdopcion {
        const rAdopcion = new RAdopcion();
        rAdopcion.estado = adopcion.estado;
        rAdopcion.id_publicacion = adopcion.id_publicacion;
        rAdopcion.id_usuario = adopcion.id_usuario;
        return rAdopcion;
    }
}
