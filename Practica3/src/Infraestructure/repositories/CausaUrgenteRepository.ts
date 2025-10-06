import { Repository, LessThan, MoreThan } from "typeorm";
import { AppDataSource } from "../../data-source";
import { ICausaUrgenteRepo, CausaUrgenteCreador, CausaUrgenteUpdate } from "../../Domain/repositories/icausa_urgente";
import { CausaUrgente as DomainCausaUrgente } from "../../Domain/entities/causa_urgente";
import { CausaUrgente as RCausaUrgente } from "../entities/rcausa_urgente";
import { Donacion as RDonacion } from "../entities/rdonacion";

export class CausaUrgenteRepository implements ICausaUrgenteRepo {
    private repository: Repository<RCausaUrgente>;
    private donacionRepository: Repository<RDonacion>;

    constructor() {
        this.repository = AppDataSource.getRepository(RCausaUrgente);
        this.donacionRepository = AppDataSource.getRepository(RDonacion);
    }

    insert(causaUrgente: CausaUrgenteCreador, callback: (err: Error | null, result?: DomainCausaUrgente) => void): void {
        this.createCausaUrgente(causaUrgente)
            .then(result => callback(null, result))
            .catch(err => callback(err));
    }

    async findById(id: string): Promise<DomainCausaUrgente | null> {
        const causaUrgente = await this.repository.findOne({
            where: { id_causa_urgente: id },
            relations: ["refugio", "animal"]
        });
        return causaUrgente ? this.toDomainEntity(causaUrgente) : null;
    }

    async findAll(): Promise<DomainCausaUrgente[]> {
        const causasUrgentes = await this.repository.find({
            relations: ["refugio", "animal"]
        });
        return causasUrgentes.map(this.toDomainEntity);
    }

    async update(id: string, data: CausaUrgenteUpdate): Promise<DomainCausaUrgente> {
        await this.repository.update({ id_causa_urgente: id }, data);
        const updatedCausaUrgente = await this.repository.findOne({
            where: { id_causa_urgente: id },
            relations: ["refugio", "animal"]
        });
        if (!updatedCausaUrgente) {
            throw new Error(`CausaUrgente with id ${id} not found`);
        }
        return this.toDomainEntity(updatedCausaUrgente);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete({ id_causa_urgente: id });
        return (result.affected ?? 0) > 0;
    }

    async findByRefugio(id_refugio: string): Promise<DomainCausaUrgente[]> {
        const causasUrgentes = await this.repository.find({
            where: { id_refugio },
            relations: ["refugio", "animal"]
        });
        return causasUrgentes.map(this.toDomainEntity);
    }

    async findByAnimal(id_animal: string): Promise<DomainCausaUrgente[]> {
        const causasUrgentes = await this.repository.find({
            where: { id_animal },
            relations: ["refugio", "animal"]
        });
        return causasUrgentes.map(this.toDomainEntity);
    }

    async findActivas(): Promise<DomainCausaUrgente[]> {
        const now = new Date();
        const causasUrgentes = await this.repository.find({
            where: {
                fecha_limite: MoreThan(now)
            },
            relations: ["refugio", "animal"]
        });
        return causasUrgentes.map(this.toDomainEntity);
    }

    async findProximasAVencer(dias: number): Promise<DomainCausaUrgente[]> {
        const now = new Date();
        const fechaLimite = new Date();
        fechaLimite.setDate(now.getDate() + dias);

        const causasUrgentes = await this.repository.find({
            where: {
                fecha_limite: LessThan(fechaLimite)
            },
            relations: ["refugio", "animal"]
        });

        // Filtrar solo las que aún están activas
        const activas = causasUrgentes.filter(causa => causa.fecha_limite > now);
        return activas.map(this.toDomainEntity);
    }

    async calcularTotalRecaudado(id_causa: string): Promise<number> {
        const donaciones = await this.donacionRepository.find({
            where: { id_causa_urgente: id_causa }
        });

        return donaciones.reduce((total, donacion) => total + Number(donacion.monto), 0);
    }

    async calcularPorcentajeAlcanzado(id_causa: string): Promise<number> {
        const causa = await this.repository.findOne({
            where: { id_causa_urgente: id_causa }
        });

        if (!causa) {
            throw new Error(`CausaUrgente with id ${id_causa} not found`);
        }

        const totalRecaudado = await this.calcularTotalRecaudado(id_causa);
        const meta = Number(causa.meta);

        if (meta === 0) {
            return 0;
        }

        return (totalRecaudado / meta) * 100;
    }

    private async createCausaUrgente(causaUrgenteData: CausaUrgenteCreador): Promise<DomainCausaUrgente> {
        const rCausaUrgente = this.toInfrastructureEntity(causaUrgenteData);
        const savedCausaUrgente = await this.repository.save(rCausaUrgente);
        return this.toDomainEntity(savedCausaUrgente);
    }

    private toDomainEntity(rCausaUrgente: RCausaUrgente): DomainCausaUrgente {
        const domainCausaUrgente: DomainCausaUrgente = {
            id_causa_urgente: rCausaUrgente.id_causa_urgente,
            titulo: rCausaUrgente.titulo,
            meta: rCausaUrgente.meta,
            fecha_limite: rCausaUrgente.fecha_limite,
            id_refugio: rCausaUrgente.id_refugio
        };

        if (rCausaUrgente.descripcion) {
            domainCausaUrgente.descripcion = rCausaUrgente.descripcion;
        }
        if (rCausaUrgente.id_animal) {
            domainCausaUrgente.id_animal = rCausaUrgente.id_animal;
        }

        return domainCausaUrgente;
    }

    private toInfrastructureEntity(causaUrgente: CausaUrgenteCreador): RCausaUrgente {
        const rCausaUrgente = new RCausaUrgente();
        rCausaUrgente.titulo = causaUrgente.titulo;
        rCausaUrgente.meta = causaUrgente.meta;
        rCausaUrgente.fecha_limite = causaUrgente.fecha_limite;
        rCausaUrgente.id_refugio = causaUrgente.id_refugio;

        if (causaUrgente.descripcion) {
            rCausaUrgente.descripcion = causaUrgente.descripcion;
        }
        if (causaUrgente.id_animal) {
            rCausaUrgente.id_animal = causaUrgente.id_animal;
        }

        return rCausaUrgente;
    }
}
