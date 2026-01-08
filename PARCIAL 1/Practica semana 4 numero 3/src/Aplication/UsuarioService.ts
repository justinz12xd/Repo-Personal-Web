import { UsuarioRepository } from "../Infraestructure/repositories/UsuarioRepository";
import { Usuario, CreadorDeUsuario } from "../Domain/entities/usuario";
import { UsuarioCreador, UsuarioUpdate } from "../Domain/repositories/iusuario";

export class UsuarioService {
    private usuarioRepository: UsuarioRepository;

    constructor() {
        this.usuarioRepository = new UsuarioRepository();
    }

    async create(usuarioData: UsuarioCreador): Promise<Usuario> {
        return new Promise((resolve, reject) => {
            this.usuarioRepository.insert(usuarioData, (err, result) => {
                if (err) {
                    reject(err);
                } else if (result) {
                    resolve(result);
                } else {
                    reject(new Error('No se pudo crear el usuario'));
                }
            });
        });
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.findAll();
    }

    async findOne(id: string): Promise<Usuario | null> {
        return await this.usuarioRepository.findById(id);
    }

    async findByEmail(email: string): Promise<Usuario | null> {
        const repository = this.usuarioRepository as any;
        return await repository.repository.findOne({ where: { email } });
    }

    async update(id: string, updateData: UsuarioUpdate): Promise<Usuario> {
        return await this.usuarioRepository.update(id, updateData);
    }

    async remove(id: string): Promise<boolean> {
        return await this.usuarioRepository.delete(id);
    }
}