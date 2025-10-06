import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { IEspecieRepo, EspecieCreador, EspecieUpdate } from "../../Domain/repositories/iespecie";
import { Especie as DomainEspecie } from "../../Domain/entities/especie";
import { Especie as REspecie } from "../entities/respecie";

export class EspecieRepository implements IEspecieRepo {
    private repository: Repository<REspecie>;

    constructor() {
        this.repository = AppDataSource.getRepository(REspecie);
    }

    insert(especie: EspecieCreador, callback: (err: Error | null, result?: DomainEspecie) => void): void {
        this.createEspecie(especie)
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async findById(id: string): Promise<DomainEspecie | null> {
        const especie = await this.repository.findOne({
            where: { id_especie: id }
        });
        return especie ? this.toDomainEntity(especie) : null;
    }

    async findAll(): Promise<DomainEspecie[]> {
        const especies = await this.repository.find();
        return especies.map(this.toDomainEntity);
    }

    async update(id: string, data: EspecieUpdate): Promise<DomainEspecie> {
        await this.repository.update({ id_especie: id }, data);
        const updatedEspecie = await this.repository.findOne({
            where: { id_especie: id }
        });
        if (!updatedEspecie) {
            throw new Error(`Especie with id ${id} not found`);
        }
        return this.toDomainEntity(updatedEspecie);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete({ id_especie: id });
        return (result.affected ?? 0) > 0;
    }

    async findByNombre(nombre: string): Promise<DomainEspecie | null> {
        const especie = await this.repository.findOne({
            where: { nombre }
        });
        return especie ? this.toDomainEntity(especie) : null;
    }

    private async createEspecie(especieData: EspecieCreador): Promise<DomainEspecie> {
        const rEspecie = this.toInfrastructureEntity(especieData);
        const savedEspecie = await this.repository.save(rEspecie);
        return this.toDomainEntity(savedEspecie);
    }

    private toDomainEntity(rEspecie: REspecie): DomainEspecie {
        return {
            id_especie: rEspecie.id_especie,
            nombre: rEspecie.nombre
        };
    }

    private toInfrastructureEntity(especie: EspecieCreador): REspecie {
        const rEspecie = new REspecie();
        rEspecie.nombre = especie.nombre;
        return rEspecie;
    }
}
