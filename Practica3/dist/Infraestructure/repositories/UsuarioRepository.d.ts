import { IUsuarioRepo, UsuarioCreador, UsuarioUpdate } from "../../Domain/repositories/iusuario";
import { Usuario as DomainUsuario } from "../../Domain/entities/usuario";
export declare class UsuarioRepository implements IUsuarioRepo {
    private repository;
    constructor();
    insert(usuario: UsuarioCreador, callback: (err: Error | null, result?: DomainUsuario) => void): void;
    findById(id: string): Promise<DomainUsuario | null>;
    findAll(): Promise<DomainUsuario[]>;
    update(id: string, data: UsuarioUpdate): Promise<DomainUsuario>;
    delete(id: string): Promise<boolean>;
    private createUsuario;
    private toDomainEntity;
    private toInfrastructureEntity;
}
//# sourceMappingURL=UsuarioRepository.d.ts.map