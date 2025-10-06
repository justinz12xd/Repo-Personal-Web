import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "./rusuario";
import { CausaUrgente } from "./rcausa_urgente";

@Entity({name: "donacion"})
export class Donacion {
    @PrimaryGeneratedColumn("uuid")
    id_donacion!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    monto!: number;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    fecha!: Date;

    // Foreign Keys
    @Column()
    id_usuario!: string;

    @Column({ nullable: true })
    id_causa_urgente?: string;

    // Relaciones
    @ManyToOne(() => Usuario, (usuario) => usuario.donaciones)
    @JoinColumn({ name: "id_usuario" })
    usuario!: Usuario;

    @ManyToOne(() => CausaUrgente, (causa) => causa.donaciones, { nullable: true })
    @JoinColumn({ name: "id_causa_urgente" })
    causa_urgente?: CausaUrgente;
}
