import { Repository, Between } from "typeorm";
import { AppDataSource } from "../../data-source";
import { ISeguimientoRepo, SeguimientoCreador, SeguimientoUpdate } from "../../Domain/repositories/iseguimiento";
import { Seguimiento as DomainSeguimiento } from "../../Domain/entities/seguimiento";
import { Seguimiento as RSeguimiento } from "../entities/rseguimiento";

export class SeguimientoRepository implements ISeguimientoRepo {
    private repository: Repository<RSeguimiento>;

    constructor() {
        this.repository = AppDataSource.getRepository(RSeguimiento);
    }

    insert(seguimiento: SeguimientoCreador, callback: (err: Error | null, result?: DomainSeguimiento) => void): void {
        this.createSeguimiento(seguimiento)
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async findById(id: string): Promise<DomainSeguimiento | null> {
        const seguimiento = await this.repository.findOne({
            where: { id_seguimiento: id },
            relations: ["animal", "supervisor"]
        });
        return seguimiento ? this.toDomainEntity(seguimiento) : null;
    }

    async findAll(): Promise<DomainSeguimiento[]> {
        const seguimientos = await this.repository.find({
            relations: ["animal", "supervisor"]
        });
        return seguimientos.map(this.toDomainEntity);
    }

    async update(id: string, data: SeguimientoUpdate): Promise<DomainSeguimiento> {
        await this.repository.update({ id_seguimiento: id }, data);
        const updatedSeguimiento = await this.repository.findOne({
            where: { id_seguimiento: id },
            relations: ["animal", "supervisor"]
        });
        if (!updatedSeguimiento) {
            throw new Error(`Seguimiento with id ${id} not found`);
        }
        return this.toDomainEntity(updatedSeguimiento);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete({ id_seguimiento: id });
        return (result.affected ?? 0) > 0;
    }

    async findByAnimal(id_animal: string): Promise<DomainSeguimiento[]> {
        const seguimientos = await this.repository.find({
            where: { id_animal },
            relations: ["animal", "supervisor"],
            order: { fecha_seguimiento: "DESC" }
        });
        return seguimientos.map(this.toDomainEntity);
    }

    async findBySupervisor(id_supervisor: string): Promise<DomainSeguimiento[]> {
        const seguimientos = await this.repository.find({
            where: { id_supervisor },
            relations: ["animal", "supervisor"],
            order: { fecha_seguimiento: "DESC" }
        });
        return seguimientos.map(this.toDomainEntity);
    }

    async findByFechaRango(fechaInicio: Date, fechaFin: Date): Promise<DomainSeguimiento[]> {
        const seguimientos = await this.repository.find({
            where: {
                fecha_seguimiento: Between(fechaInicio, fechaFin)
            },
            relations: ["animal", "supervisor"],
            order: { fecha_seguimiento: "DESC" }
        });
        return seguimientos.map(this.toDomainEntity);
    }

    async findRecientesByAnimal(id_animal: string, limit: number): Promise<DomainSeguimiento[]> {
        const seguimientos = await this.repository.find({
            where: { id_animal },
            relations: ["animal", "supervisor"],
            order: { fecha_seguimiento: "DESC" },
            take: limit
        });
        return seguimientos.map(this.toDomainEntity);
    }

    private async createSeguimiento(seguimientoData: SeguimientoCreador): Promise<DomainSeguimiento> {
        const rSeguimiento = this.toInfrastructureEntity(seguimientoData);
        const savedSeguimiento = await this.repository.save(rSeguimiento);
        return this.toDomainEntity(savedSeguimiento);
    }

    private toDomainEntity(rSeguimiento: RSeguimiento): DomainSeguimiento {
        const domainSeguimiento: DomainSeguimiento = {
            id_seguimiento: rSeguimiento.id_seguimiento,
            titulo: rSeguimiento.titulo,
            fecha_seguimiento: rSeguimiento.fecha_seguimiento,
            id_animal: rSeguimiento.id_animal,
            id_supervisor: rSeguimiento.id_supervisor
        };

        if (rSeguimiento.observaciones) {
            domainSeguimiento.observaciones = rSeguimiento.observaciones;
        }

        return domainSeguimiento;
    }

    private toInfrastructureEntity(seguimiento: SeguimientoCreador): RSeguimiento {
        const rSeguimiento = new RSeguimiento();
        rSeguimiento.titulo = seguimiento.titulo;
        rSeguimiento.id_animal = seguimiento.id_animal;
        rSeguimiento.id_supervisor = seguimiento.id_supervisor;

        if (seguimiento.observaciones) {
            rSeguimiento.observaciones = seguimiento.observaciones;
        }

        return rSeguimiento;
    }
}
