"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animal = void 0;
const typeorm_1 = require("typeorm");
const respecie_1 = require("./respecie");
const rrefugio_1 = require("./rrefugio");
const rsupervisor_1 = require("./rsupervisor");
const rpublicacion_1 = require("./rpublicacion");
const rseguimiento_1 = require("./rseguimiento");
const rcausa_urgente_1 = require("./rcausa_urgente");
let Animal = class Animal {
};
exports.Animal = Animal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Animal.prototype, "id_animal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Animal.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Animal.prototype, "edad", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Animal.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "text" }),
    __metadata("design:type", String)
], Animal.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true, nullable: true }),
    __metadata("design:type", Array)
], Animal.prototype, "fotos", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Animal.prototype, "estado_adopcion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Animal.prototype, "id_especie", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Animal.prototype, "id_refugio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Animal.prototype, "id_supervisor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => respecie_1.Especie, (especie) => especie.animales),
    (0, typeorm_1.JoinColumn)({ name: "id_especie" }),
    __metadata("design:type", respecie_1.Especie)
], Animal.prototype, "especie", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rrefugio_1.Refugio, (refugio) => refugio.animales),
    (0, typeorm_1.JoinColumn)({ name: "id_refugio" }),
    __metadata("design:type", rrefugio_1.Refugio)
], Animal.prototype, "refugio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rsupervisor_1.Supervisor, (supervisor) => supervisor.animales, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "id_supervisor" }),
    __metadata("design:type", rsupervisor_1.Supervisor)
], Animal.prototype, "supervisor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rpublicacion_1.Publicacion, (publicacion) => publicacion.animal),
    __metadata("design:type", Array)
], Animal.prototype, "publicaciones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rseguimiento_1.Seguimiento, (seguimiento) => seguimiento.animal),
    __metadata("design:type", Array)
], Animal.prototype, "seguimientos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rcausa_urgente_1.CausaUrgente, (causa) => causa.animal),
    __metadata("design:type", Array)
], Animal.prototype, "causas_urgentes", void 0);
exports.Animal = Animal = __decorate([
    (0, typeorm_1.Entity)({ name: "animal" })
], Animal);
//# sourceMappingURL=ranimal.js.map