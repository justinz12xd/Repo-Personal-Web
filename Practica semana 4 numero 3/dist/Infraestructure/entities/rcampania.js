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
exports.Campania = void 0;
const typeorm_1 = require("typeorm");
const rtipo_campania_1 = require("./rtipo_campania");
const rvoluntario_1 = require("./rvoluntario");
let Campania = class Campania {
};
exports.Campania = Campania;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Campania.prototype, "id_campania", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Campania.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "text" }),
    __metadata("design:type", String)
], Campania.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Campania.prototype, "fecha_inicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime" }),
    __metadata("design:type", Date)
], Campania.prototype, "fecha_fin", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Campania.prototype, "lugar", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Campania.prototype, "organizador", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Campania.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Campania.prototype, "id_tipo_campania", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rtipo_campania_1.TipoCampania, (tipo) => tipo.campanias),
    (0, typeorm_1.JoinColumn)({ name: "id_tipo_campania" }),
    __metadata("design:type", rtipo_campania_1.TipoCampania)
], Campania.prototype, "tipo_campania", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rvoluntario_1.Voluntario, (voluntario) => voluntario.campania),
    __metadata("design:type", Array)
], Campania.prototype, "voluntarios", void 0);
exports.Campania = Campania = __decorate([
    (0, typeorm_1.Entity)({ name: "campania" })
], Campania);
//# sourceMappingURL=rcampania.js.map