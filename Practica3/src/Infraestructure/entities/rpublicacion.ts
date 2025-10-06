import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Usuario } from "./rusuario";
import { Animal } from "./ranimal";
import { Adopcion } from "./radopcion";

@Entity({ name: "publicacion" })
export class Publicacion {
    @PrimaryGeneratedColumn("uuid")
    id_publicacion!: string;

    @Column()
    titulo!: string;

    @Column({ nullable: true, type: "text" })
    descripcion?: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    fecha_subida!: Date;

    @Column()
    estado!: string;

    // Foreign Keys
    @Column()
    id_usuario!: string;

    @Column()
    id_animal!: string;

    // Relaciones
    @ManyToOne(() => Usuario, (usuario) => usuario.publicaciones)
    @JoinColumn({ name: "id_usuario" })
    usuario!: Usuario;

    @ManyToOne(() => Animal, (animal) => animal.publicaciones)
    @JoinColumn({ name: "id_animal" })
    animal!: Animal;

    @OneToMany(() => Adopcion, (adopcion) => adopcion.publicacion)
    adopciones?: Adopcion[];
}