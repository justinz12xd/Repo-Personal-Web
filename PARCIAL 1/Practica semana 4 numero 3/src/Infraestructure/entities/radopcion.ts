import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Publicacion } from "./rpublicacion";
import { Usuario } from "./rusuario";

@Entity({ name: "adopcion" })
export class Adopcion {
    @PrimaryGeneratedColumn("uuid")
    id_adopcion!: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    fecha_adopcion!: Date;

    @Column()
    estado!: string;

    // Foreign Keys
    @Column()
    id_publicacion!: string;

    @Column()
    id_usuario!: string;

    // Relaciones
    @ManyToOne(() => Publicacion, (publicacion) => publicacion.adopciones)
    @JoinColumn({ name: "id_publicacion" })
    publicacion!: Publicacion;

    @ManyToOne(() => Usuario, (usuario) => usuario.adopciones)
    @JoinColumn({ name: "id_usuario" })
    usuario!: Usuario;
}