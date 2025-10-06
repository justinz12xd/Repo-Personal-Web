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
exports.Donacion = void 0;
const typeorm_1 = require("typeorm");
const rusuario_1 = require("./rusuario");
const rcausa_urgente_1 = require("./rcausa_urgente");
let Donacion = class Donacion {
};
exports.Donacion = Donacion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Donacion.prototype, "id_donacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Donacion.prototype, "monto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Donacion.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Donacion.prototype, "id_usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Donacion.prototype, "id_causa_urgente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rusuario_1.Usuario, (usuario) => usuario.donaciones),
    (0, typeorm_1.JoinColumn)({ name: "id_usuario" }),
    __metadata("design:type", rusuario_1.Usuario)
], Donacion.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rcausa_urgente_1.CausaUrgente, (causa) => causa.donaciones, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "id_causa_urgente" }),
    __metadata("design:type", rcausa_urgente_1.CausaUrgente)
], Donacion.prototype, "causa_urgente", void 0);
exports.Donacion = Donacion = __decorate([
    (0, typeorm_1.Entity)({ name: "donacion" })
], Donacion);
//# sourceMappingURL=rdonacion.js.map