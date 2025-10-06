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
exports.Voluntario = void 0;
const typeorm_1 = require("typeorm");
const rusuario_1 = require("./rusuario");
const rcampania_1 = require("./rcampania");
let Voluntario = class Voluntario {
};
exports.Voluntario = Voluntario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Voluntario.prototype, "id_voluntario", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Voluntario.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Voluntario.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Voluntario.prototype, "id_usuario", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Voluntario.prototype, "id_campania", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rusuario_1.Usuario, (usuario) => usuario.voluntarios),
    (0, typeorm_1.JoinColumn)({ name: "id_usuario" }),
    __metadata("design:type", rusuario_1.Usuario)
], Voluntario.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rcampania_1.Campania, (campania) => campania.voluntarios),
    (0, typeorm_1.JoinColumn)({ name: "id_campania" }),
    __metadata("design:type", rcampania_1.Campania)
], Voluntario.prototype, "campania", void 0);
exports.Voluntario = Voluntario = __decorate([
    (0, typeorm_1.Entity)({ name: "voluntario" })
], Voluntario);
//# sourceMappingURL=rvoluntario.js.map