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
exports.Refugio = void 0;
const typeorm_1 = require("typeorm");
const ranimal_1 = require("./ranimal");
const rsupervisor_1 = require("./rsupervisor");
const rcausa_urgente_1 = require("./rcausa_urgente");
let Refugio = class Refugio {
};
exports.Refugio = Refugio;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Refugio.prototype, "id_refugio", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Refugio.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Refugio.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Refugio.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "text" }),
    __metadata("design:type", String)
], Refugio.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ranimal_1.Animal, (animal) => animal.refugio),
    __metadata("design:type", Array)
], Refugio.prototype, "animales", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rsupervisor_1.Supervisor, (supervisor) => supervisor.refugio),
    __metadata("design:type", Array)
], Refugio.prototype, "supervisores", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rcausa_urgente_1.CausaUrgente, (causa) => causa.refugio),
    __metadata("design:type", Array)
], Refugio.prototype, "causas_urgentes", void 0);
exports.Refugio = Refugio = __decorate([
    (0, typeorm_1.Entity)({ name: "refugio" })
], Refugio);
//# sourceMappingURL=rrefugio.js.map