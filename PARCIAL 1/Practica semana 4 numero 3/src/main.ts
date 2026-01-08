import { AppDataSource } from "./data-source";
import { DatabaseSeeder } from "./seeds/DatabaseSeeder";
import { AnimalService } from "./Aplication/AnimalService";
import { UsuarioService } from "./Aplication/UsuarioService";
import { DonacionService } from "./Aplication/DonacionService";
import { CampaniaService } from "./Aplication/CampaniaService";

async function main() {
    try {
        // 1. Inicializar conexión a la base de datos
        console.log("Inicializando conexión a la base de datos...");
        await AppDataSource.initialize();
        console.log("Conexión a SQLite establecida exitosamente");

        // 2. Ejecutar seeding de datos
        console.log("\n" + "=".repeat(50));
        console.log("           EJECUTANDO SEEDING");
        console.log("=".repeat(50));
        
        const seeder = new DatabaseSeeder();
        await seeder.seedDatabase();

        // 3. Crear instancias de servicios para pruebas
        console.log("\n" + "=".repeat(50));
        console.log("         INICIANDO PRUEBAS CRUD");
        console.log("=".repeat(50));

        const animalService = new AnimalService();
        const usuarioService = new UsuarioService();
        const donacionService = new DonacionService();
        const campaniaService = new CampaniaService();

        // 4. PROBAR CRUD COMPLETO
        await testCRUDOperations(animalService, usuarioService, donacionService, campaniaService);

        console.log("\nTodas las pruebas completadas exitosamente!");

    } catch (error) {
        console.error("Error durante la ejecución:", error);
        process.exit(1);
    } finally {
        // Cerrar conexión
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
            console.log(" Conexión a la base de datos cerrada");
        }
    }
}

async function testCRUDOperations(
    animalService: AnimalService,
    usuarioService: UsuarioService,
    donacionService: DonacionService,
    campaniaService: CampaniaService
) {
    // ========== TESTING USUARIOS ==========
    console.log("\n=== TESTING USUARIOS ===");
    
    // READ: findAll()
    console.log("\n Testing findAll() - Usuarios:");
    const allUsers = await usuarioService.findAll();
    console.log(` Usuarios encontrados: ${allUsers.length}`);
    allUsers.forEach(user => {
        console.log(`   - ${user.nombre} (${user.email})`);
    });

    // READ: findOne()
    if (allUsers.length > 0) {
        console.log("\nTesting findOne() - Usuario:");
        const firstUser = await usuarioService.findOne(allUsers[0].id_usuario);
        console.log(` Usuario encontrado: ${firstUser?.nombre} - ${firstUser?.email}`);

        // UPDATE: update()
        console.log("\n Testing update() - Usuario:");
        const updatedUser = await usuarioService.update(allUsers[0].id_usuario, {
            telefono: "555-9999"
        });
        console.log(` Usuario actualizado: ${updatedUser.nombre} - Teléfono: ${updatedUser.telefono}`);
    }

    // ========== TESTING ANIMALES ==========
    console.log("\n=== TESTING ANIMALES ===");
    
    // READ: findAll()
    console.log("\nTesting findAll() - Animales:");
    const allAnimals = await animalService.findAll();
    console.log(`Animales encontrados: ${allAnimals.length}`);
    allAnimals.forEach(animal => {
        console.log(`   - ${animal.nombre} (${animal.edad}) - Estado: ${animal.estado_adopcion}`);
    });

    // READ: findOne()
    if (allAnimals.length > 0) {
        console.log("\n Testing findOne() - Animal:");
        const firstAnimal = await animalService.findOne(allAnimals[0].id_animal);
        console.log(` Animal encontrado: ${firstAnimal?.nombre} - ${firstAnimal?.descripcion}`);

        // UPDATE: update()
        console.log("\nTesting update() - Animal:");
        const updatedAnimal = await animalService.update(allAnimals[0].id_animal, {
            descripcion: "Descripción actualizada durante las pruebas"
        });
        console.log(`Animal actualizado: ${updatedAnimal.nombre} - ${updatedAnimal.descripcion}`);

        // Testing métodos específicos
        console.log("\n Testing findByEstadoAdopcion():");
        const disponibles = await animalService.findByEstadoAdopcion("Disponible");
        console.log(` Animales disponibles: ${disponibles.length}`);
    }

    // ========== TESTING DONACIONES ==========
    console.log("\n === TESTING DONACIONES ===");
    
    // READ: findAll()
    console.log("\n Testing findAll() - Donaciones:");
    const allDonations = await donacionService.findAll();
    console.log(` Donaciones encontradas: ${allDonations.length}`);
    allDonations.forEach(donacion => {
        console.log(`   - $${donacion.monto} - Usuario: ${donacion.id_usuario}`);
    });

    // READ: findOne()
    if (allDonations.length > 0) {
        console.log("\n Testing findOne() - Donación:");
        const firstDonation = await donacionService.findOne(allDonations[0].id_donacion);
        console.log(` Donación encontrada: $${firstDonation?.monto} - Fecha: ${firstDonation?.fecha}`);

        // Testing métodos específicos
        console.log("\n Testing getTotalDonado():");
        const totalDonado = await donacionService.getTotalDonado();
        console.log(` Total donado: $${totalDonado}`);

        if (allUsers.length > 0) {
            console.log("\n Testing findByUsuario():");
            const donacionesUsuario = await donacionService.findByUsuario(allUsers[0].id_usuario);
            console.log(` Donaciones del usuario ${allUsers[0].nombre}: ${donacionesUsuario.length}`);
        }
    }

    // ========== TESTING CAMPAÑAS ==========
    console.log("\n === TESTING CAMPAÑAS ===");

    // READ: findAll()
    console.log("\n Testing findAll() - Campañas:");
    const allCampaigns = await campaniaService.findAll();
    console.log(`Campañas encontradas: ${allCampaigns.length}`);
    allCampaigns.forEach(campania => {
        console.log(`   - ${campania.titulo} - Estado: ${campania.estado}`);
    });

    // READ: findOne()
    if (allCampaigns.length > 0) {
        console.log("\n Testing findOne() - Campaña:");
        const firstCampaign = await campaniaService.findOne(allCampaigns[0].id_campania);
        console.log(` Campaña encontrada: ${firstCampaign?.titulo} - ${firstCampaign?.descripcion}`);

        // UPDATE: update()
        console.log("\n Testing update() - Campaña:");
        const updatedCampaign = await campaniaService.update(allCampaigns[0].id_campania, {
            descripcion: "Descripción actualizada durante las pruebas"
        });
        console.log(`Campaña actualizada: ${updatedCampaign.titulo} - ${updatedCampaign.descripcion}`);

        // Testing métodos específicos
        console.log("\n Testing findActivas():");
        const campanasActivas = await campaniaService.findActivas();
        console.log(`Campañas activas: ${campanasActivas.length}`);
    }

    // ========== TESTING DELETE (solo uno como ejemplo) ==========
    console.log("\n === TESTING DELETE ===");
    
    // Crear un usuario temporal para eliminar
    console.log("\n Creando usuario temporal para prueba de eliminación:");
    const tempUser = await usuarioService.create({
        nombre: "Usuario Temporal",
        email: "temp@test.com",
        contrasenia: "temp123"
    });
    console.log(` Usuario temporal creado: ${tempUser.nombre}`);

    // DELETE: remove()
    console.log("\n Testing remove() - Usuario temporal:");
    const deleteResult = await usuarioService.remove(tempUser.id_usuario);
    console.log(` Usuario eliminado: ${deleteResult ? 'Exitoso' : 'Falló'}`);

    // Verificar que fue eliminado
    const deletedUser = await usuarioService.findOne(tempUser.id_usuario);
    console.log(` Verificación de eliminación: ${deletedUser ? 'Usuario aún existe' : 'Usuario eliminado correctamente'}`);
}

// Ejecutar el script principal
main();