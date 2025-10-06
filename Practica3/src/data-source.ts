import "reflect-metadata";
import { DataSource } from "typeorm";
import { Animal } from "./Infraestructure/entities/ranimal";
import { Campania } from "./Infraestructure/entities/rcampania";
import { Donacion } from "./Infraestructure/entities/rdonacion";
import { Especie } from "./Infraestructure/entities/respecie";
import { Refugio } from "./Infraestructure/entities/rrefugio";
import { TipoCampania } from "./Infraestructure/entities/rtipo_campania";
import { Usuario } from "./Infraestructure/entities/rusuario";
import { Adopcion } from "./Infraestructure/entities/radopcion";
import { Publicacion } from "./Infraestructure/entities/rpublicacion";
import { Supervisor } from "./Infraestructure/entities/rsupervisor";
import { Seguimiento } from "./Infraestructure/entities/rseguimiento";
import { CausaUrgente } from "./Infraestructure/entities/rcausa_urgente";
import { Voluntario } from "./Infraestructure/entities/rvoluntario";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: true,
  entities: [
    Animal, 
    Campania, 
    Donacion, 
    Especie, 
    Refugio, 
    TipoCampania, 
    Usuario,
    Adopcion,
    Publicacion, 
    Supervisor, 
    Seguimiento, 
    CausaUrgente, 
    Voluntario
  ],
  migrations: [],
  subscribers: [],
});
