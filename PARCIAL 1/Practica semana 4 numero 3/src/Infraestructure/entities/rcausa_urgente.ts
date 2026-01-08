import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Refugio } from "./rrefugio";
import { Animal } from "./ranimal";
import { Donacion } from "./rdonacion";

@Entity({ name: "causa_urgente" })
export class CausaUrgente {
    @PrimaryGeneratedColumn("uuid")
    id_causa_urgente!: string;
        
    @Column()
    titulo!: string;

    @Column({ type: "text" })
    descripcion?: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    meta!: number;

    @Column({ type: "datetime" })
    fecha_limite!: Date;

    // Foreign Keys
    @Column()
    id_refugio!: string;

    @Column({ nullable: true })
    id_animal?: string;

    // Relaciones
    @ManyToOne(() => Refugio, (refugio) => refugio.causas_urgentes)
    @JoinColumn({ name: "id_refugio" })
    refugio!: Refugio;

    @ManyToOne(() => Animal, (animal) => animal.causas_urgentes, { nullable: true })
    @JoinColumn({ name: "id_animal" })
    animal?: Animal;

    @OneToMany(() => Donacion, (donacion) => donacion.causa_urgente)
    donaciones?: Donacion[];
}
