import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { IDonacionRepo, DonacionCreador, DonacionUpdate } from "../../Domain/repositories/idonacion";
import { Donacion as DomainDonacion } from "../../Domain/entities/donacion";
import { Donacion as RDonacion } from "../entities/rdonacion";

export class DonacionRepository implements IDonacionRepo {
    private repository: Repository<RDonacion>;

    constructor() {
        this.repository = AppDataSource.getRepository(RDonacion);
    }

    insert(donacion: DonacionCreador, callback: (err: Error | null, result?: DomainDonacion) => void): void {
        this.createDonacion(donacion)
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async findById(id: string): Promise<DomainDonacion | null> {
        const donacion = await this.repository.findOne({
            where: { id_donacion: id },
            relations: ["usuario", "causa_urgente"]
        });
        return donacion ? this.toDomainEntity(donacion) : null;
    }

    async findAll(): Promise<DomainDonacion[]> {
        const donaciones = await this.repository.find({
            relations: ["usuario", "causa_urgente"]
        });
        return donaciones.map(donacion => this.toDomainEntity(donacion));
    }

    async update(id: string, data: DonacionUpdate): Promise<DomainDonacion> {
        await this.repository.update({ id_donacion: id }, data);
        const updatedDonacion = await this.repository.findOne({
            where: { id_donacion: id },
            relations: ["usuario", "causa_urgente"]
        });
        if (!updatedDonacion) {
            throw new Error(`Donacion with id ${id} not found`);
        }
        return this.toDomainEntity(updatedDonacion);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete({ id_donacion: id });
        return (result.affected ?? 0) > 0;
    }

    // Métodos adicionales específicos para donaciones
    async findByUsuario(id_usuario: string): Promise<DomainDonacion[]> {
        const donaciones = await this.repository.find({
            where: { id_usuario },
            relations: ["usuario", "causa_urgente"]
        });
        return donaciones.map(donacion => this.toDomainEntity(donacion));
    }

    async findByCausaUrgente(id_causa_urgente: string): Promise<DomainDonacion[]> {
        const donaciones = await this.repository.find({
            where: { id_causa_urgente },
            relations: ["usuario", "causa_urgente"]
        });
        return donaciones.map(donacion => this.toDomainEntity(donacion));
    }

    async findByFechaRango(fechaInicio: Date, fechaFin: Date): Promise<DomainDonacion[]> {
        const donaciones = await this.repository
            .createQueryBuilder("donacion")
            .where("donacion.fecha >= :fechaInicio", { fechaInicio })
            .andWhere("donacion.fecha <= :fechaFin", { fechaFin })
            .leftJoinAndSelect("donacion.usuario", "usuario")
            .leftJoinAndSelect("donacion.causa_urgente", "causa_urgente")
            .getMany();
        return donaciones.map(donacion => this.toDomainEntity(donacion));
    }

    async getTotalDonado(id_causa_urgente?: string): Promise<number> {
        const queryBuilder = this.repository
            .createQueryBuilder("donacion")
            .select("SUM(donacion.monto)", "total");
            
        if (id_causa_urgente) {
            queryBuilder.where("donacion.id_causa_urgente = :id_causa_urgente", { id_causa_urgente });
        }
        
        const result = await queryBuilder.getRawOne();
        return parseFloat(result.total) || 0;
    }

    async getTotalDonadoPorUsuario(id_usuario: string): Promise<number> {
        const result = await this.repository
            .createQueryBuilder("donacion")
            .select("SUM(donacion.monto)", "total")
            .where("donacion.id_usuario = :id_usuario", { id_usuario })
            .getRawOne();
        return parseFloat(result.total) || 0;
    }

    private async createDonacion(donacionData: DonacionCreador): Promise<DomainDonacion> {
        const rDonacion = this.toInfrastructureEntity(donacionData);
        const savedDonacion = await this.repository.save(rDonacion);
        return this.toDomainEntity(savedDonacion);
    }

    private toDomainEntity(rDonacion: RDonacion): DomainDonacion {
        const domainDonacion: DomainDonacion = {
            id_donacion: rDonacion.id_donacion,
            monto: rDonacion.monto,
            fecha: rDonacion.fecha,
            id_usuario: rDonacion.id_usuario
        };
        
        // Asignar propiedades opcionales solo si tienen valor
        if (rDonacion.id_causa_urgente) {
            domainDonacion.id_causa_urgente = rDonacion.id_causa_urgente;
        }
        
        return domainDonacion;
    }

    private toInfrastructureEntity(donacion: DonacionCreador): RDonacion {
        const rDonacion = new RDonacion();
        rDonacion.monto = donacion.monto;
        rDonacion.id_usuario = donacion.id_usuario;
        
        // Asignar propiedades opcionales solo si tienen valor
        if (donacion.id_causa_urgente) {
            rDonacion.id_causa_urgente = donacion.id_causa_urgente;
        }
        
        return rDonacion;
    }
}