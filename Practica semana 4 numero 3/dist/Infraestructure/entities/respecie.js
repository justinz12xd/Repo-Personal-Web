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
exports.Especie = void 0;
const typeorm_1 = require("typeorm");
const ranimal_1 = require("./ranimal");
let Especie = class Especie {
};
exports.Especie = Especie;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Especie.prototype, "id_especie", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Especie.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ranimal_1.Animal, (animal) => animal.especie),
    __metadata("design:type", Array)
], Especie.prototype, "animales", void 0);
exports.Especie = Especie = __decorate([
    (0, typeorm_1.Entity)({ name: "especie" })
], Especie);
//# sourceMappingURL=respecie.js.map