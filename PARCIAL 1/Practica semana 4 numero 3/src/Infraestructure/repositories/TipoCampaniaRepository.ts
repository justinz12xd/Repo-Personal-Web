import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { ITipoCampaniaRepo, TipoCampaniaCreador, TipoCampaniaUpdate } from "../../Domain/repositories/itipo_campania";
import { TipoCampania as DomainTipoCampania } from "../../Domain/entities/tipo_campania";
import { TipoCampania as RTipoCampania } from "../entities/rtipo_campania";

export class TipoCampaniaRepository implements ITipoCampaniaRepo {
    private repository: Repository<RTipoCampania>;

    constructor() {
        this.repository = AppDataSource.getRepository(RTipoCampania);
    }

    insert(tipoCampania: TipoCampaniaCreador, callback: (err: Error | null, result?: DomainTipoCampania) => void): void {
        this.createTipoCampania(tipoCampania)
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async findById(id: string): Promise<DomainTipoCampania | null> {
        const tipoCampania = await this.repository.findOne({
            where: { id_tipo_campania: id }
        });
        return tipoCampania ? this.toDomainEntity(tipoCampania) : null;
    }

    async findAll(): Promise<DomainTipoCampania[]> {
        const tiposCampania = await this.repository.find();
        return tiposCampania.map(this.toDomainEntity);
    }

    async update(id: string, data: TipoCampaniaUpdate): Promise<DomainTipoCampania> {
        await this.repository.update({ id_tipo_campania: id }, data);
        const updatedTipoCampania = await this.repository.findOne({
            where: { id_tipo_campania: id }
        });
        if (!updatedTipoCampania) {
            throw new Error(`TipoCampania with id ${id} not found`);
        }
        return this.toDomainEntity(updatedTipoCampania);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete({ id_tipo_campania: id });
        return (result.affected ?? 0) > 0;
    }

    async findByNombre(nombre: string): Promise<DomainTipoCampania | null> {
        const tipoCampania = await this.repository.findOne({
            where: { nombre }
        });
        return tipoCampania ? this.toDomainEntity(tipoCampania) : null;
    }

    private async createTipoCampania(tipoCampaniaData: TipoCampaniaCreador): Promise<DomainTipoCampania> {
        const rTipoCampania = this.toInfrastructureEntity(tipoCampaniaData);
        const savedTipoCampania = await this.repository.save(rTipoCampania);
        return this.toDomainEntity(savedTipoCampania);
    }

    private toDomainEntity(rTipoCampania: RTipoCampania): DomainTipoCampania {
        const domainTipoCampania: DomainTipoCampania = {
            id_tipo_campania: rTipoCampania.id_tipo_campania,
            nombre: rTipoCampania.nombre
        };

        if (rTipoCampania.descripcion) {
            domainTipoCampania.descripcion = rTipoCampania.descripcion;
        }

        return domainTipoCampania;
    }

    private toInfrastructureEntity(tipoCampania: TipoCampaniaCreador): RTipoCampania {
        const rTipoCampania = new RTipoCampania();
        rTipoCampania.nombre = tipoCampania.nombre;

        if (tipoCampania.descripcion) {
            rTipoCampania.descripcion = tipoCampania.descripcion;
        }

        return rTipoCampania;
    }
}
