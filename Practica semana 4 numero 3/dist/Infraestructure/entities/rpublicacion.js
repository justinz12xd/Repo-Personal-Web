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
exports.Publicacion = void 0;
const typeorm_1 = require("typeorm");
const rusuario_1 = require("./rusuario");
const ranimal_1 = require("./ranimal");
const radopcion_1 = require("./radopcion");
let Publicacion = class Publicacion {
};
exports.Publicacion = Publicacion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Publicacion.prototype, "id_publicacion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Publicacion.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "text" }),
    __metadata("design:type", String)
], Publicacion.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "datetime", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Publicacion.prototype, "fecha_subida", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Publicacion.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Publicacion.prototype, "id_usuario", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Publicacion.prototype, "id_animal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rusuario_1.Usuario, (usuario) => usuario.publicaciones),
    (0, typeorm_1.JoinColumn)({ name: "id_usuario" }),
    __metadata("design:type", rusuario_1.Usuario)
], Publicacion.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ranimal_1.Animal, (animal) => animal.publicaciones),
    (0, typeorm_1.JoinColumn)({ name: "id_animal" }),
    __metadata("design:type", ranimal_1.Animal)
], Publicacion.prototype, "animal", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => radopcion_1.Adopcion, (adopcion) => adopcion.publicacion),
    __metadata("design:type", Array)
], Publicacion.prototype, "adopciones", void 0);
exports.Publicacion = Publicacion = __decorate([
    (0, typeorm_1.Entity)({ name: "publicacion" })
], Publicacion);
//# sourceMappingURL=rpublicacion.js.map