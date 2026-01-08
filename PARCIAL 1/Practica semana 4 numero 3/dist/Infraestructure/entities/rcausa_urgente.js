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
exports.CausaUrgente = void 0;
const typeorm_1 = require("typeorm");
const rrefugio_1 = require("./rrefugio");
const ranimal_1 = require("./ranimal");
const rdonacion_1 = require("./rdonacion");
let CausaUrgente = class CausaUrgente {
};
exports.CausaUrgente = CausaUrgente;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], CausaUrgente.prototype, "id_causa_urgente", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CausaUrgente.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], CausaUrgente.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], CausaUrgente.prototype, "meta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime" }),
    __metadata("design:type", Date)
], CausaUrgente.prototype, "fecha_limite", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CausaUrgente.prototype, "id_refugio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CausaUrgente.prototype, "id_animal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rrefugio_1.Refugio, (refugio) => refugio.causas_urgentes),
    (0, typeorm_1.JoinColumn)({ name: "id_refugio" }),
    __metadata("design:type", rrefugio_1.Refugio)
], CausaUrgente.prototype, "refugio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ranimal_1.Animal, (animal) => animal.causas_urgentes, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "id_animal" }),
    __metadata("design:type", ranimal_1.Animal)
], CausaUrgente.prototype, "animal", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rdonacion_1.Donacion, (donacion) => donacion.causa_urgente),
    __metadata("design:type", Array)
], CausaUrgente.prototype, "donaciones", void 0);
exports.CausaUrgente = CausaUrgente = __decorate([
    (0, typeorm_1.Entity)({ name: "causa_urgente" })
], CausaUrgente);
//# sourceMappingURL=rcausa_urgente.js.map