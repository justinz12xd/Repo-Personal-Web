import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Refugio } from "./rrefugio";
import { Animal } from "./ranimal";
import { Seguimiento } from "./rseguimiento";

@Entity({ name: "supervisor" })
export class Supervisor{ 
    @PrimaryGeneratedColumn("uuid")
    id_supervisor!: string;

    @Column()
    nombre!: string;

    @Column()
    total_animales!: number;

    // Foreign Keys
    @Column()
    id_refugio!: string; 

    // Relaciones
    @ManyToOne(() => Refugio, (refugio) => refugio.supervisores)
    @JoinColumn({ name: "id_refugio" })
    refugio!: Refugio;

    @OneToMany(() => Animal, (animal) => animal.supervisor)
    animales?: Animal[];

    @OneToMany(() => Seguimiento, (seguimiento) => seguimiento.supervisor)
    seguimientos?: Seguimiento[];
}