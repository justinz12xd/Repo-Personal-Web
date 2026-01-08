import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Campania } from "./rcampania";

@Entity({name: "tipo_campania"})
export class TipoCampania {
    @PrimaryGeneratedColumn("uuid")
    id_tipo_campania!: string;

    @Column()
    nombre!: string;

    @Column({ nullable: true, type: "text" })
    descripcion?: string;

    // Relaciones
    @OneToMany(() => Campania, (campania) => campania.tipo_campania)
    campanias?: Campania[];
}