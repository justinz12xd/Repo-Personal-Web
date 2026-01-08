import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Animal } from "./ranimal";
import { Supervisor } from "./rsupervisor";
import { CausaUrgente } from "./rcausa_urgente";

@Entity({name: "refugio"})
export class Refugio {
    @PrimaryGeneratedColumn("uuid")
    id_refugio!: string;

    @Column()
    nombre!: string;

    @Column({ nullable: true })
    direccion?: string;

    @Column({ nullable: true })
    telefono?: string;

    @Column({ nullable: true, type: "text" })
    descripcion?: string;

    // Relaciones
    @OneToMany(() => Animal, (animal) => animal.refugio)
    animales?: Animal[];

    @OneToMany(() => Supervisor, (supervisor) => supervisor.refugio)
    supervisores?: Supervisor[];

    @OneToMany(() => CausaUrgente, (causa) => causa.refugio)
    causas_urgentes?: CausaUrgente[];
}
