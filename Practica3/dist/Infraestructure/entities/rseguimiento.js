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
exports.Seguimiento = void 0;
const typeorm_1 = require("typeorm");
const ranimal_1 = require("./ranimal");
const rsupervisor_1 = require("./rsupervisor");
let Seguimiento = class Seguimiento {
};
exports.Seguimiento = Seguimiento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Seguimiento.prototype, "id_seguimiento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Seguimiento.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "text" }),
    __metadata("design:type", String)
], Seguimiento.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Seguimiento.prototype, "fecha_seguimiento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Seguimiento.prototype, "id_animal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Seguimiento.prototype, "id_supervisor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ranimal_1.Animal, (animal) => animal.seguimientos),
    (0, typeorm_1.JoinColumn)({ name: "id_animal" }),
    __metadata("design:type", ranimal_1.Animal)
], Seguimiento.prototype, "animal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rsupervisor_1.Supervisor, (supervisor) => supervisor.seguimientos),
    (0, typeorm_1.JoinColumn)({ name: "id_supervisor" }),
    __metadata("design:type", rsupervisor_1.Supervisor)
], Seguimiento.prototype, "supervisor", void 0);
exports.Seguimiento = Seguimiento = __decorate([
    (0, typeorm_1.Entity)({ name: "seguimiento" })
], Seguimiento);
//# sourceMappingURL=rseguimiento.js.map