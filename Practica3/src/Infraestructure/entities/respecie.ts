import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Animal } from "./ranimal";

@Entity({ name: "especie" })
export class Especie {
    @PrimaryGeneratedColumn("uuid")
    id_especie!: string;

    @Column({ unique: true })
    nombre!: string;

    // Relaciones
    @OneToMany(() => Animal, (animal) => animal.especie)
    animales?: Animal[];
}