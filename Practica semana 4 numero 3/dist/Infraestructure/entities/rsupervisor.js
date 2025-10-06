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
exports.Supervisor = void 0;
const typeorm_1 = require("typeorm");
const rrefugio_1 = require("./rrefugio");
const ranimal_1 = require("./ranimal");
const rseguimiento_1 = require("./rseguimiento");
let Supervisor = class Supervisor {
};
exports.Supervisor = Supervisor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Supervisor.prototype, "id_supervisor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Supervisor.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Supervisor.prototype, "total_animales", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Supervisor.prototype, "id_refugio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rrefugio_1.Refugio, (refugio) => refugio.supervisores),
    (0, typeorm_1.JoinColumn)({ name: "id_refugio" }),
    __metadata("design:type", rrefugio_1.Refugio)
], Supervisor.prototype, "refugio", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ranimal_1.Animal, (animal) => animal.supervisor),
    __metadata("design:type", Array)
], Supervisor.prototype, "animales", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rseguimiento_1.Seguimiento, (seguimiento) => seguimiento.supervisor),
    __metadata("design:type", Array)
], Supervisor.prototype, "seguimientos", void 0);
exports.Supervisor = Supervisor = __decorate([
    (0, typeorm_1.Entity)({ name: "supervisor" })
], Supervisor);
//# sourceMappingURL=rsupervisor.js.map