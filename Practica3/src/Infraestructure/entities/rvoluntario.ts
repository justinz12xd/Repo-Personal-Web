import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Usuario } from "./rusuario";
import { Campania } from "./rcampania";

@Entity({ name: "voluntario" })
export class Voluntario {
    @PrimaryGeneratedColumn("uuid")
    id_voluntario!: string;

    @Column()
    rol!: string;
    
    @Column()
    estado!: string;

    // Foreign Keys
    @Column()
    id_usuario!: string;

    @Column()
    id_campania!: string;

    // Relaciones
    @ManyToOne(() => Usuario, (usuario) => usuario.voluntarios)
    @JoinColumn({ name: "id_usuario" })
    usuario!: Usuario;

    @ManyToOne(() => Campania, (campania) => campania.voluntarios)
    @JoinColumn({ name: "id_campania" })
    campania!: Campania;
}
