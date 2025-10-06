import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { TipoCampania } from "./rtipo_campania";
import { Voluntario } from "./rvoluntario";

@Entity({ name: "campania" })
export class Campania {
    @PrimaryGeneratedColumn("uuid")
    id_campania!: string;

    @Column()
    titulo!: string;

    @Column({ nullable: true, type: "text" })
    descripcion?: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    fecha_inicio!: Date;

    @Column({ type: "datetime" })
    fecha_fin!: Date;

    @Column({ nullable: true })
    lugar?: string;

    @Column({ nullable: true })
    organizador?: string;

    @Column()
    estado!: string;

    // Foreign Keys
    @Column()
    id_tipo_campania!: string;

    // Relaciones
    @ManyToOne(() => TipoCampania, (tipo) => tipo.campanias)
    @JoinColumn({ name: "id_tipo_campania" })
    tipo_campania!: TipoCampania;

    @OneToMany(() => Voluntario, (voluntario) => voluntario.campania)
    voluntarios?: Voluntario[];
}