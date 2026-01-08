import { Repository, Between } from "typeorm";
import { AppDataSource } from "../../data-source";
import { IPublicacionRepo, PublicacionCreador, PublicacionUpdate } from "../../Domain/repositories/ipublicacion";
import { Publicacion as DomainPublicacion } from "../../Domain/entities/publicacion";
import { Publicacion as RPublicacion } from "../entities/rpublicacion";

export class PublicacionRepository implements IPublicacionRepo {
    private repository: Repository<RPublicacion>;

    constructor() {
        this.repository = AppDataSource.getRepository(RPublicacion);
    }

    insert(publicacion: PublicacionCreador, callback: (err: Error | null, result?: DomainPublicacion) => void): void {
        this.createPublicacion(publicacion)
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async findById(id: string): Promise<DomainPublicacion | null> {
        const publicacion = await this.repository.findOne({
            where: { id_publicacion: id },
            relations: ["usuario", "animal"]
        });
        return publicacion ? this.toDomainEntity(publicacion) : null;
    }

    async findAll(): Promise<DomainPublicacion[]> {
        const publicaciones = await this.repository.find({
            relations: ["usuario", "animal"]
        });
        return publicaciones.map(this.toDomainEntity);
    }

    async update(id: string, data: PublicacionUpdate): Promise<DomainPublicacion> {
        await this.repository.update({ id_publicacion: id }, data);
        const updatedPublicacion = await this.repository.findOne({
            where: { id_publicacion: id },
            relations: ["usuario", "animal"]
        });
        if (!updatedPublicacion) {
            throw new Error(`Publicacion with id ${id} not found`);
        }
        return this.toDomainEntity(updatedPublicacion);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete({ id_publicacion: id });
        return (result.affected ?? 0) > 0;
    }

    async findByUsuario(id_usuario: string): Promise<DomainPublicacion[]> {
        const publicaciones = await this.repository.find({
            where: { id_usuario },
            relations: ["usuario", "animal"]
        });
        return publicaciones.map(this.toDomainEntity);
    }

    async findByAnimal(id_animal: string): Promise<DomainPublicacion[]> {
        const publicaciones = await this.repository.find({
            where: { id_animal },
            relations: ["usuario", "animal"]
        });
        return publicaciones.map(this.toDomainEntity);
    }

    async findByEstado(estado: string): Promise<DomainPublicacion[]> {
        const publicaciones = await this.repository.find({
            where: { estado },
            relations: ["usuario", "animal"]
        });
        return publicaciones.map(this.toDomainEntity);
    }

    async findByFechaRango(fechaInicio: Date, fechaFin: Date): Promise<DomainPublicacion[]> {
        const publicaciones = await this.repository.find({
            where: {
                fecha_subida: Between(fechaInicio, fechaFin)
            },
            relations: ["usuario", "animal"]
        });
        return publicaciones.map(this.toDomainEntity);
    }

    private async createPublicacion(publicacionData: PublicacionCreador): Promise<DomainPublicacion> {
        const rPublicacion = this.toInfrastructureEntity(publicacionData);
        const savedPublicacion = await this.repository.save(rPublicacion);
        return this.toDomainEntity(savedPublicacion);
    }

    private toDomainEntity(rPublicacion: RPublicacion): DomainPublicacion {
        const domainPublicacion: DomainPublicacion = {
            id_publicacion: rPublicacion.id_publicacion,
            titulo: rPublicacion.titulo,
            estado: rPublicacion.estado,
            fecha_subida: rPublicacion.fecha_subida,
            id_usuario: rPublicacion.id_usuario,
            id_animal: rPublicacion.id_animal
        };

        if (rPublicacion.descripcion) {
            domainPublicacion.descripcion = rPublicacion.descripcion;
        }

        return domainPublicacion;
    }

    private toInfrastructureEntity(publicacion: PublicacionCreador): RPublicacion {
        const rPublicacion = new RPublicacion();
        rPublicacion.titulo = publicacion.titulo;
        rPublicacion.estado = publicacion.estado;
        rPublicacion.id_usuario = publicacion.id_usuario;
        rPublicacion.id_animal = publicacion.id_animal;

        if (publicacion.descripcion) {
            rPublicacion.descripcion = publicacion.descripcion;
        }

        return rPublicacion;
    }
}
