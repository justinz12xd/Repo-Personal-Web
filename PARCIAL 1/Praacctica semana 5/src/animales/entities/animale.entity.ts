import { Column, Entity, PrimaryGeneratedColumn ,} from "typeorm";

@Entity()
export class Animal {
    @PrimaryGeneratedColumn('uuid')
    id_animal:string

    @Column()
    nombre: string;

    @Column('uuid')
    id_especie: string;

    @Column()
    edad: string;

    @Column()
    estado: string;

    @Column()
    descripcion: string;

    @Column()
    fotos: string;

    @Column()
    estado_adopcion: string;

    @Column('uuid')
    id_refugio:string;
}
