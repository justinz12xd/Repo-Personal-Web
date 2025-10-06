import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Especie } from "./respecie";
import { Refugio } from "./rrefugio";
import { Supervisor } from "./rsupervisor";
import { Publicacion } from "./rpublicacion";
import { Seguimiento } from "./rseguimiento";
import { CausaUrgente } from "./rcausa_urgente";

@Entity({ name: "animal" })
export class Animal {
    @PrimaryGeneratedColumn("uuid")
    id_animal!: string;

    @Column()
    nombre!: string;

    @Column()
    edad!: string;

    @Column()
    estado!: string;

    @Column({ nullable: true, type: "text" })
    descripcion?: string;

    @Column("text", { array: true, nullable: true })
    fotos?: string[];

    @Column()
    estado_adopcion!: string;

    // Foreign Keys
    @Column()
    id_especie!: string;

    @Column()
    id_refugio!: string;

    @Column({ nullable: true })
    id_supervisor?: string;

    // Relaciones
    @ManyToOne(() => Especie, (especie) => especie.animales)
    @JoinColumn({ name: "id_especie" })
    especie!: Especie;

    @ManyToOne(() => Refugio, (refugio) => refugio.animales)
    @JoinColumn({ name: "id_refugio" })
    refugio!: Refugio;

    @ManyToOne(() => Supervisor, (supervisor) => supervisor.animales, { nullable: true })
    @JoinColumn({ name: "id_supervisor" })
    supervisor?: Supervisor;

    @OneToMany(() => Publicacion, (publicacion) => publicacion.animal)
    publicaciones?: Publicacion[];

    @OneToMany(() => Seguimiento, (seguimiento) => seguimiento.animal)
    seguimientos?: Seguimiento[];

    @OneToMany(() => CausaUrgente, (causa) => causa.animal)
    causas_urgentes?: CausaUrgente[];
}