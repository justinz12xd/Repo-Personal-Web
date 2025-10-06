import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { ICampaniaRepo, CampaniaCreador, CampaniaUpdate } from "../../Domain/repositories/icampania";
import { Campania as DomainCampania } from "../../Domain/entities/campania";
import { Campania as RCampania } from "../entities/rcampania";

export class CampaniaRepository implements ICampaniaRepo {
    private repository: Repository<RCampania>;

    constructor() {
        this.repository = AppDataSource.getRepository(RCampania);
    }

    insert(campania: CampaniaCreador, callback: (err: Error | null, result?: DomainCampania) => void): void {
        this.createCampania(campania)
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async findById(id: string): Promise<DomainCampania | null> {
        const campania = await this.repository.findOne({
            where: { id_campania: id },
            relations: ["tipo_campania"]
        });
        return campania ? this.toDomainEntity(campania) : null;
    }

    async findAll(): Promise<DomainCampania[]> {
        const campanias = await this.repository.find({
            relations: ["tipo_campania"]
        });
        return campanias.map(campania => this.toDomainEntity(campania));
    }

    async update(id: string, data: CampaniaUpdate): Promise<DomainCampania> {
        await this.repository.update({ id_campania: id }, data);
        const updatedCampania = await this.repository.findOne({
            where: { id_campania: id },
            relations: ["tipo_campania"]
        });
        if (!updatedCampania) {
            throw new Error(`Campania with id ${id} not found`);
        }
        return this.toDomainEntity(updatedCampania);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete({ id_campania: id });
        return (result.affected ?? 0) > 0;
    }

    // Métodos adicionales específicos
    async findByTipoCampania(id_tipo_campania: string): Promise<DomainCampania[]> {
        const campanias = await this.repository.find({
            where: { id_tipo_campania },
            relations: ["tipo_campania"]
        });
        return campanias.map(campania => this.toDomainEntity(campania));
    }

    async findByEstado(estado: string): Promise<DomainCampania[]> {
        const campanias = await this.repository.find({
            where: { estado },
            relations: ["tipo_campania"]
        });
        return campanias.map(campania => this.toDomainEntity(campania));
    }

    async findByFechaRango(fechaInicio: Date, fechaFin: Date): Promise<DomainCampania[]> {
        const campanias = await this.repository
            .createQueryBuilder("campania")
            .where("campania.fecha_inicio >= :fechaInicio", { fechaInicio })
            .andWhere("campania.fecha_fin <= :fechaFin", { fechaFin })
            .leftJoinAndSelect("campania.tipo_campania", "tipo_campania")
            .getMany();
        return campanias.map(campania => this.toDomainEntity(campania));
    }

    async findActivas(): Promise<DomainCampania[]> {
        const campanias = await this.repository
            .createQueryBuilder("campania")
            .where("campania.estado = :estado", { estado: "activa" })
            .andWhere("campania.fecha_fin >= :now", { now: new Date() })
            .leftJoinAndSelect("campania.tipo_campania", "tipo_campania")
            .getMany();
        return campanias.map(campania => this.toDomainEntity(campania));
    }

    private async createCampania(campaniaData: CampaniaCreador): Promise<DomainCampania> {
        const rCampania = this.toInfrastructureEntity(campaniaData);
        const savedCampania = await this.repository.save(rCampania);
        return this.toDomainEntity(savedCampania);
    }

    private toDomainEntity(rCampania: RCampania): DomainCampania {
        const domainCampania: DomainCampania = {
            id_campania: rCampania.id_campania,
            titulo: rCampania.titulo,
            id_tipo_campania: rCampania.id_tipo_campania,
            estado: rCampania.estado,
            fecha_inicio: rCampania.fecha_inicio,
            fecha_fin: rCampania.fecha_fin
        };
        
        // Asignar propiedades opcionales solo si tienen valor
        if (rCampania.descripcion) {
            domainCampania.descripcion = rCampania.descripcion;
        }
        if (rCampania.lugar) {
            domainCampania.lugar = rCampania.lugar;
        }
        if (rCampania.organizador) {
            domainCampania.organizador = rCampania.organizador;
        }
        
        return domainCampania;
    }

    private toInfrastructureEntity(campania: CampaniaCreador): RCampania {
        const rCampania = new RCampania();
        rCampania.titulo = campania.titulo;
        rCampania.id_tipo_campania = campania.id_tipo_campania;
        rCampania.estado = campania.estado;
        rCampania.fecha_inicio = campania.fecha_inicio;
        rCampania.fecha_fin = campania.fecha_fin;
        
        // Asignar propiedades opcionales solo si tienen valor
        if (campania.descripcion) {
            rCampania.descripcion = campania.descripcion;
        }
        if (campania.lugar) {
            rCampania.lugar = campania.lugar;
        }
        if (campania.organizador) {
            rCampania.organizador = campania.organizador;
        }
        
        return rCampania;
    }
}