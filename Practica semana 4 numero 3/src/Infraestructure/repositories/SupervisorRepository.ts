import { Repository, Like } from "typeorm";
import { AppDataSource } from "../../data-source";
import { ISupervisorRepo, SupervisorCreador, SupervisorUpdate } from "../../Domain/repositories/isupervisor";
import { Supervisor as DomainSupervisor } from "../../Domain/entities/supervisor";
import { Supervisor as RSupervisor } from "../entities/rsupervisor";

export class SupervisorRepository implements ISupervisorRepo {
    private repository: Repository<RSupervisor>;

    constructor() {
        this.repository = AppDataSource.getRepository(RSupervisor);
    }

    insert(supervisor: SupervisorCreador, callback: (err: Error | null, result?: DomainSupervisor) => void): void {
        this.createSupervisor(supervisor)
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async findById(id: string): Promise<DomainSupervisor | null> {
        const supervisor = await this.repository.findOne({
            where: { id_supervisor: id },
            relations: ["refugio"]
        });
        return supervisor ? this.toDomainEntity(supervisor) : null;
    }

    async findAll(): Promise<DomainSupervisor[]> {
        const supervisores = await this.repository.find({
            relations: ["refugio"]
        });
        return supervisores.map(this.toDomainEntity);
    }

    async update(id: string, data: SupervisorUpdate): Promise<DomainSupervisor> {
        await this.repository.update({ id_supervisor: id }, data);
        const updatedSupervisor = await this.repository.findOne({
            where: { id_supervisor: id },
            relations: ["refugio"]
        });
        if (!updatedSupervisor) {
            throw new Error(`Supervisor with id ${id} not found`);
        }
        return this.toDomainEntity(updatedSupervisor);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete({ id_supervisor: id });
        return (result.affected ?? 0) > 0;
    }

    async findByRefugio(id_refugio: string): Promise<DomainSupervisor[]> {
        const supervisores = await this.repository.find({
            where: { id_refugio },
            relations: ["refugio"]
        });
        return supervisores.map(this.toDomainEntity);
    }

    async findByNombre(nombre: string): Promise<DomainSupervisor[]> {
        const supervisores = await this.repository.find({
            where: { nombre: Like(`%${nombre}%`) },
            relations: ["refugio"]
        });
        return supervisores.map(this.toDomainEntity);
    }

    async incrementarTotalAnimales(id: string): Promise<DomainSupervisor> {
        const supervisor = await this.repository.findOne({
            where: { id_supervisor: id }
        });
        if (!supervisor) {
            throw new Error(`Supervisor with id ${id} not found`);
        }
        supervisor.total_animales += 1;
        const updated = await this.repository.save(supervisor);
        return this.toDomainEntity(updated);
    }

    async decrementarTotalAnimales(id: string): Promise<DomainSupervisor> {
        const supervisor = await this.repository.findOne({
            where: { id_supervisor: id }
        });
        if (!supervisor) {
            throw new Error(`Supervisor with id ${id} not found`);
        }
        if (supervisor.total_animales > 0) {
            supervisor.total_animales -= 1;
        }
        const updated = await this.repository.save(supervisor);
        return this.toDomainEntity(updated);
    }

    private async createSupervisor(supervisorData: SupervisorCreador): Promise<DomainSupervisor> {
        const rSupervisor = this.toInfrastructureEntity(supervisorData);
        const savedSupervisor = await this.repository.save(rSupervisor);
        return this.toDomainEntity(savedSupervisor);
    }

    private toDomainEntity(rSupervisor: RSupervisor): DomainSupervisor {
        return {
            id_supervisor: rSupervisor.id_supervisor,
            nombre: rSupervisor.nombre,
            total_animales: rSupervisor.total_animales,
            id_refugio: rSupervisor.id_refugio
        };
    }

    private toInfrastructureEntity(supervisor: SupervisorCreador): RSupervisor {
        const rSupervisor = new RSupervisor();
        rSupervisor.nombre = supervisor.nombre;
        rSupervisor.total_animales = supervisor.total_animales;
        rSupervisor.id_refugio = supervisor.id_refugio;
        return rSupervisor;
    }
}
