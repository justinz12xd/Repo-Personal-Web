"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const AnimalRepository_1 = require("./Infraestructure/repositories/AnimalRepository");
const UsuarioRepository_1 = require("./Infraestructure/repositories/UsuarioRepository");
const DonacionRepository_1 = require("./Infraestructure/repositories/DonacionRepository");
const CampaniaRepository_1 = require("./Infraestructure/repositories/CampaniaRepository");
async function main() {
    try {
        // Inicializar la conexión a la base de datos
        await data_source_1.AppDataSource.initialize();
        console.log("Base de datos levantadas jjjjj");
        // Crear instancias de los repositorios TypeORM
        const animalRepo = new AnimalRepository_1.AnimalRepository();
        const usuarioRepo = new UsuarioRepository_1.UsuarioRepository();
        const donacionRepo = new DonacionRepository_1.DonacionRepository();
        const campaniaRepo = new CampaniaRepository_1.CampaniaRepository();
        console.log("Se inicio typeorm aqui ");
        // Aquí puedes agregar la lógica de tu aplicación
        // Por ejemplo:
        // const animals = await animalRepo.findAll();
        // console.log("Animals in database:", animals.length);
        // const users = await usuarioRepo.findAll();
        // console.log("Users in database:", users.length);
    }
    catch (error) {
        console.error("Error durante la inicialización de la aplicación:", error);
    }
}
main().catch((error) => {
    console.error("Error durante la inicialización de la fuente de datos:", error);
});
//# sourceMappingURL=app.js.map