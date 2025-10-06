"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const ranimal_1 = require("./Infraestructure/entities/ranimal");
const rcampania_1 = require("./Infraestructure/entities/rcampania");
const rdonacion_1 = require("./Infraestructure/entities/rdonacion");
const respecie_1 = require("./Infraestructure/entities/respecie");
const rrefugio_1 = require("./Infraestructure/entities/rrefugio");
const rtipo_campania_1 = require("./Infraestructure/entities/rtipo_campania");
const rusuario_1 = require("./Infraestructure/entities/rusuario");
const radopcion_1 = require("./Infraestructure/entities/radopcion");
const rpublicacion_1 = require("./Infraestructure/entities/rpublicacion");
const rsupervisor_1 = require("./Infraestructure/entities/rsupervisor");
const rseguimiento_1 = require("./Infraestructure/entities/rseguimiento");
const rcausa_urgente_1 = require("./Infraestructure/entities/rcausa_urgente");
const rvoluntario_1 = require("./Infraestructure/entities/rvoluntario");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [
        ranimal_1.Animal,
        rcampania_1.Campania,
        rdonacion_1.Donacion,
        respecie_1.Especie,
        rrefugio_1.Refugio,
        rtipo_campania_1.TipoCampania,
        rusuario_1.Usuario,
        radopcion_1.Adopcion,
        rpublicacion_1.Publicacion,
        rsupervisor_1.Supervisor,
        rseguimiento_1.Seguimiento,
        rcausa_urgente_1.CausaUrgente,
        rvoluntario_1.Voluntario
    ],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map