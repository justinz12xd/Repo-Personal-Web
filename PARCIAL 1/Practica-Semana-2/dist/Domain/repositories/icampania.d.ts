import { Campania } from "../entities/campania";
export interface ICampania {
    insert(campania: Campania, callback: (err: Error | null, result?: Campania) => void): void;
    getById(id: number): Promise<Campania | null>;
    update(id: number, data: Partial<Campania>): Promise<Campania | null>;
    delete(id: number): Promise<boolean>;
}
//# sourceMappingURL=icampania.d.ts.map