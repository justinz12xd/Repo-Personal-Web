import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Animal } from "./ranimal";
import { Supervisor } from "./rsupervisor";

@Entity({ name: "seguimiento" })
export class Seguimiento {
    @PrimaryGeneratedColumn("uuid")
    id_seguimiento!: string;

    @Column()
    titulo!: string;

    @Column({ nullable: true, type: "text" })
    observaciones?: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    fecha_seguimiento!: Date;

    // Foreign Keys
    @Column()
    id_animal!: string;

    @Column()
    id_supervisor!: string;

    // Relaciones
    @ManyToOne(() => Animal, (animal) => animal.seguimientos)
    @JoinColumn({ name: "id_animal" })
    animal!: Animal;

    @ManyToOne(() => Supervisor, (supervisor) => supervisor.seguimientos)
    @JoinColumn({ name: "id_supervisor" })
    supervisor!: Supervisor;
}