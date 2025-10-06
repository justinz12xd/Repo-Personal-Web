import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { IVoluntarioRepo, VoluntarioCreador, VoluntarioUpdate } from "../../Domain/repositories/ivoluntario";
import { Voluntario as DomainVoluntario } from "../../Domain/entities/voluntario";
import { Voluntario as RVoluntario } from "../entities/rvoluntario";

export class VoluntarioRepository implements IVoluntarioRepo {
    private repository: Repository<RVoluntario>;

    constructor() {
        this.repository = AppDataSource.getRepository(RVoluntario);
    }

    insert(voluntario: VoluntarioCreador, callback: (err: Error | null, result?: DomainVoluntario) => void): void {
        this.createVoluntario(voluntario)
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async findById(id: string): Promise<DomainVoluntario | null> {
        const voluntario = await this.repository.findOne({
            where: { id_voluntario: id },
            relations: ["usuario", "campania"]
        });
        return voluntario ? this.toDomainEntity(voluntario) : null;
    }

    async findAll(): Promise<DomainVoluntario[]> {
        const voluntarios = await this.repository.find({
            relations: ["usuario", "campania"]
        });
        return voluntarios.map(this.toDomainEntity);
    }

    async update(id: string, data: VoluntarioUpdate): Promise<DomainVoluntario> {
        await this.repository.update({ id_voluntario: id }, data);
        const updatedVoluntario = await this.repository.findOne({
            where: { id_voluntario: id },
            relations: ["usuario", "campania"]
        });
        if (!updatedVoluntario) {
            throw new Error(`Voluntario with id ${id} not found`);
        }
        return this.toDomainEntity(updatedVoluntario);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete({ id_voluntario: id });
        return (result.affected ?? 0) > 0;
    }

    async findByUsuario(id_usuario: string): Promise<DomainVoluntario[]> {
        const voluntarios = await this.repository.find({
            where: { id_usuario },
            relations: ["usuario", "campania"]
        });
        return voluntarios.map(this.toDomainEntity);
    }

    async findByCampania(id_campania: string): Promise<DomainVoluntario[]> {
        const voluntarios = await this.repository.find({
            where: { id_campania },
            relations: ["usuario", "campania"]
        });
        return voluntarios.map(this.toDomainEntity);
    }

    async findByEstado(estado: string): Promise<DomainVoluntario[]> {
        const voluntarios = await this.repository.find({
            where: { estado },
            relations: ["usuario", "campania"]
        });
        return voluntarios.map(this.toDomainEntity);
    }

    async findByRol(rol: string): Promise<DomainVoluntario[]> {
        const voluntarios = await this.repository.find({
            where: { rol },
            relations: ["usuario", "campania"]
        });
        return voluntarios.map(this.toDomainEntity);
    }

    async countVoluntariosByCampania(id_campania: string): Promise<number> {
        return await this.repository.count({
            where: { id_campania }
        });
    }

    private async createVoluntario(voluntarioData: VoluntarioCreador): Promise<DomainVoluntario> {
        const rVoluntario = this.toInfrastructureEntity(voluntarioData);
        const savedVoluntario = await this.repository.save(rVoluntario);
        return this.toDomainEntity(savedVoluntario);
    }

    private toDomainEntity(rVoluntario: RVoluntario): DomainVoluntario {
        return {
            id_voluntario: rVoluntario.id_voluntario,
            rol: rVoluntario.rol,
            estado: rVoluntario.estado,
            id_usuario: rVoluntario.id_usuario,
            id_campania: rVoluntario.id_campania
        };
    }

    private toInfrastructureEntity(voluntario: VoluntarioCreador): RVoluntario {
        const rVoluntario = new RVoluntario();
        rVoluntario.rol = voluntario.rol;
        rVoluntario.estado = voluntario.estado;
        rVoluntario.id_usuario = voluntario.id_usuario;
        rVoluntario.id_campania = voluntario.id_campania;
        return rVoluntario;
    }
}
