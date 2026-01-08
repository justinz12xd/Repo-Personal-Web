import { ICampaniaRepo, CampaniaCreador, CampaniaUpdate } from "../../Domain/repositories/icampania";
import { Campania as DomainCampania } from "../../Domain/entities/campania";
export declare class CampaniaRepository implements ICampaniaRepo {
    private repository;
    constructor();
    insert(campania: CampaniaCreador, callback: (err: Error | null, result?: DomainCampania) => void): void;
    findById(id: string): Promise<DomainCampania | null>;
    findAll(): Promise<DomainCampania[]>;
    update(id: string, data: CampaniaUpdate): Promise<DomainCampania>;
    delete(id: string): Promise<boolean>;
    findByTipoCampania(id_tipo_campania: string): Promise<DomainCampania[]>;
    findByEstado(estado: string): Promise<DomainCampania[]>;
    findByFechaRango(fechaInicio: Date, fechaFin: Date): Promise<DomainCampania[]>;
    findActivas(): Promise<DomainCampania[]>;
    private createCampania;
    private toDomainEntity;
    private toInfrastructureEntity;
}
//# sourceMappingURL=CampaniaRepository.d.ts.map