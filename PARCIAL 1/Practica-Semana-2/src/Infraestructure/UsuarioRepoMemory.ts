import { IUsuarioRepo, UsuarioCreador, UsuarioUpdate } from "../Domain/repositories/iusuario";
import {Usuario, CreadorDeUsuario} from "../Domain/entities/usuario";

export class UsuarioRepoMemory implements IUsuarioRepo {
    private usuarios: Usuario[] = [];

    constructor() {
      this.UsuariosPrueba();
    }
    private UsuariosPrueba() {
        const datos_usuarios = [
        {   
            nombre: "Maria Gomez",
            email: "maria.gomez@example.com",
            contraseña: "password123",
            telefono: "0983884849",
            direccion: "Calle Falsa 123",
            rol: "admin" as const
        },
        {
            nombre: "Carlos Rodriguez",
            email: "carlos.rodriguez@example.com",
            contraseña: "password456",
            telefono: "0987654321",
            direccion: "Av. Principal 456",
            rol: "usuario" as const
        },
        {
            nombre: "Ana Martinez",
            email: "ana.martinez@example.com",
            contraseña: "password789",
            telefono: "0981234567",
            direccion: "Plaza Central 789",
            rol: "usuario" as const
        },
        {
            nombre: "Luis Garcia",
            email: "luis.garcia@example.com",
            contraseña: "password101",
            telefono: "0986789012",
            direccion: "Barrio Norte 101",
            rol: "usuario" as const
        },
        {
            nombre: "Sofia Hernandez",
            email: "sofia.hernandez@example.com",
            contraseña: "password202",
            telefono: "0985432109",
            direccion: "Zona Sur 202",
            rol: "usuario" as const
        },
        {
            nombre: "Miguel Torres",
            email: "miguel.torres@example.com",
            contraseña: "password303",
            telefono: "0984567890",
            direccion: "Sector Este 303",
            rol: "admin" as const
        },
        {
            nombre: "Carmen Lopez",
            email: "carmen.lopez@example.com",
            contraseña: "password404",
            telefono: "0983456789",
            direccion: "Colonia Oeste 404",
            rol: "usuario" as const
        },
        {
            nombre: "Roberto Silva",
            email: "roberto.silva@example.com",
            contraseña: "password505",
            telefono: "0982345678",
            direccion: "Centro Histórico 505",
            rol: "usuario" as const
        },
        {
            nombre: "Patricia Morales",
            email: "patricia.morales@example.com",
            contraseña: "password606",
            telefono: "0981234098",
            direccion: "Residencial 606",
            rol: "usuario" as const
        },
        {
            nombre: "Diego Vargas",
            email: "diego.vargas@example.com",
            contraseña: "password707",
            telefono: "0980987654",
            direccion: "Urbanización 707",
            rol: "usuario" as const
        }
        ];

        this.usuarios.push(...datos_usuarios.map(CreadorDeUsuario));
    }

    insert(usuario: UsuarioCreador, callback: (err: Error | null, result?: Usuario) => void): void {
        setTimeout(() => {
            try {
                if (!usuario) {
                    return callback(new Error("Usuario no proporcionado"));
                }
                const nuevoUsuario = CreadorDeUsuario(usuario);
                const existe = this.usuarios.some( u => u.email === nuevoUsuario.email );
                if (existe) {
                    return callback(new Error("El usuario ya existe"));
                }
                this.usuarios.push(nuevoUsuario);
                callback(null, nuevoUsuario);
            } catch (error) {
                if (error instanceof Error) {
                    callback(error);
                } else {
                    callback(new Error("Error desconocido al insertar usuario"));
                }
            }
        }, 500);
    }
    findById(id: string): Promise<Usuario | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const usuario = this.usuarios.find(u => u.id === id) || null;
                resolve(usuario);
            }, 500);
        });
    }

    findAll(): Promise<Usuario[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...this.usuarios]);
            }, 500);
        });
    }

    async update(id: string, data: UsuarioUpdate): Promise<Usuario> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    if (!id || id.trim() === "") {
                        return reject(new Error("ID no proporcionado"));
                    }
                    if (!data || Object.keys(data).length === 0) {
                        return reject(new Error("Datos de actualización no proporcionados"));
                    }
                    const index = this.usuarios.findIndex(u => u.id === id);
                    if (index === -1) {
                        return reject(new Error("Usuario no encontrado"));
                    }
                    const usuariosexistente = this.usuarios[index];
                    if (!usuariosexistente){
                        return reject(new Error("Usuario no encontrado"));
                    }

                    const usuarioActualizado: Usuario = Object.assign({}, usuariosexistente, data);
                    this.usuarios[index] = usuarioActualizado;
                    resolve(usuarioActualizado);
                } catch (error) {
                    if (error instanceof Error) {
                        reject(error);
                    } else {
                        reject(new Error("Error desconocido al actualizar usuario"));
                    }
                }
            }, 500);
        });
    }

    delete(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    if (!id || id.trim() === "") {
                        return reject(new Error("ID no proporcionado"));
                    }
                    const index = this.usuarios.findIndex(u => u.id === id);
                    if (index === -1) {
                        return reject(new Error("Usuario no encontrado"));
                    }
                    this.usuarios.splice(index, 1);
                    resolve(true);
                } catch (error) {
                    if (error instanceof Error) {
                        reject(error);
                    } else {
                        reject(new Error("Error desconocido al eliminar usuario"));
                    }
                }
            }, 500);
        });
    }
}
