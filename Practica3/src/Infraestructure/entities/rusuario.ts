import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Adopcion } from "./radopcion";
import { Publicacion } from "./rpublicacion";
import { Donacion } from "./rdonacion";
import { Voluntario } from "./rvoluntario";

@Entity({ name: "usuario" })
export class Usuario {
    @PrimaryGeneratedColumn("uuid")
    id_usuario!: string;

    @Column()
    nombre!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    contrasenia!: string;

    @Column({ nullable: true })
    telefono?: string;

    @Column({ nullable: true })
    direccion?: string;

    @Column({ type: "date", default: () => "CURRENT_DATE" })
    fecha_registro!: Date;

    // Relaciones
    @OneToMany(() => Adopcion, (adopcion) => adopcion.usuario)
    adopciones?: Adopcion[];

    @OneToMany(() => Publicacion, (publicacion) => publicacion.usuario)
    publicaciones?: Publicacion[];

    @OneToMany(() => Donacion, (donacion) => donacion.usuario)
    donaciones?: Donacion[];

    @OneToMany(() => Voluntario, (voluntario) => voluntario.usuario)
    voluntarios?: Voluntario[];
}