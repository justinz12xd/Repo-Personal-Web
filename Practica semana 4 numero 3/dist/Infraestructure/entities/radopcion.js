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
exports.Adopcion = void 0;
const typeorm_1 = require("typeorm");
const rpublicacion_1 = require("./rpublicacion");
const rusuario_1 = require("./rusuario");
let Adopcion = class Adopcion {
};
exports.Adopcion = Adopcion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Adopcion.prototype, "id_adopcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Adopcion.prototype, "fecha_adopcion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Adopcion.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Adopcion.prototype, "id_publicacion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Adopcion.prototype, "id_usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rpublicacion_1.Publicacion, (publicacion) => publicacion.adopciones),
    (0, typeorm_1.JoinColumn)({ name: "id_publicacion" }),
    __metadata("design:type", rpublicacion_1.Publicacion)
], Adopcion.prototype, "publicacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rusuario_1.Usuario, (usuario) => usuario.adopciones),
    (0, typeorm_1.JoinColumn)({ name: "id_usuario" }),
    __metadata("design:type", rusuario_1.Usuario)
], Adopcion.prototype, "usuario", void 0);
exports.Adopcion = Adopcion = __decorate([
    (0, typeorm_1.Entity)({ name: "adopcion" })
], Adopcion);
//# sourceMappingURL=radopcion.js.map