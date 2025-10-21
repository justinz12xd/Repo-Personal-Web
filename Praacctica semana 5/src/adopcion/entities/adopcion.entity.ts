import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Adopcion {
    @PrimaryGeneratedColumn('uuid')
    id_adopcion:string

    @Column()
    fecha_adopcion: Date;

    @Column()
    estado: string; 

    @Column('uuid')
    id_animal: string;

    @Column('uuid')
    id_usuario: string;

}
