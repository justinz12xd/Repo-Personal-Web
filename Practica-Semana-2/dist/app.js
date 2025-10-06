import { AnimalRepoMemory } from "./Infraestructure/AnimalRepoMemory";
console.log("🐾 === PRÁCTICA 2 - ARQUITECTURA HEXAGONAL CON PARADIGMAS ASÍNCRONOS ===\n");
async function main() {
    // Crear instancia del repositorio
    const animalRepo = new AnimalRepoMemory();
    console.log("📦 Repositorio inicializado con datos de prueba\n");
    // ====================================
    // 1. READ - Async/Await (Ver todos los animales)
    // ====================================
    console.log("🔍 === READ - FINDALL (Async/Await) ===");
    try {
        const todosLosAnimales = await animalRepo.findAll();
        console.log(`✅ Total de animales encontrados: ${todosLosAnimales.length}`);
        // Mostrar algunos ejemplos
        console.log("\n📋 Primeros 3 animales:");
        todosLosAnimales.slice(0, 3).forEach((animal, index) => {
            console.log(`   ${index + 1}. ${animal.nombre} (${animal.especie}) - Estado: ${animal.estadoAdopcion} - ID: ${animal.id.substring(0, 8)}...`);
        });
    }
    catch (error) {
        console.error("❌ Error en findAll:", error);
    }
    console.log("\n" + "=".repeat(60) + "\n");
    // ====================================
    // 2. READ - Async/Await (Buscar por ID)
    // ====================================
    console.log("🔍 === READ - FINDBYID (Async/Await) ===");
    try {
        const animales = await animalRepo.findAll();
        if (animales.length === 0) {
            console.log("❌ No hay animales en el repositorio");
            return;
        }
        const primerAnimal = animales[0]; // Sabemos que existe porque ya validamos la longitud
        console.log(`🎯 Buscando animal por ID: ${primerAnimal.id.substring(0, 8)}...`);
        const animalEncontrado = await animalRepo.findById(primerAnimal.id);
        if (animalEncontrado) {
            console.log(`✅ Animal encontrado: ${animalEncontrado.nombre} (${animalEncontrado.especie})`);
            console.log(`   Edad: ${animalEncontrado.edad} años`);
            console.log(`   Estado: ${animalEncontrado.estadoAdopcion}`);
            console.log(`   Refugio: ${animalEncontrado.id_refugio}`);
        }
        else {
            console.log("❌ Animal no encontrado");
        }
    }
    catch (error) {
        console.error("❌ Error en findById:", error);
    }
    console.log("\n" + "=".repeat(60) + "\n");
    // ====================================
    // 3. CREATE - Callbacks
    // ====================================
    console.log("➕ === CREATE - INSERT (Callbacks) ===");
    const nuevoAnimal = {
        nombre: "Bobby",
        especie: "Perro",
        edad: 2,
        estado: "Saludable",
        vacunas: ["Rabia", "Parvovirus"],
        descripcion: "Cachorro muy juguetón y amigable",
        fotos: ["bobby1.jpg", "bobby2.jpg"],
        estadoAdopcion: "Disponible",
        id_refugio: "refugio004"
    };
    console.log(`🔄 Insertando nuevo animal: ${nuevoAnimal.nombre}...`);
    // Usar callback pattern
    animalRepo.insert(nuevoAnimal, (err, result) => {
        if (err) {
            console.error("❌ Error al insertar:", err.message);
        }
        else {
            console.log("✅ Animal insertado exitosamente:");
            console.log(`   Nombre: ${result.nombre}`);
            console.log(`   ID generado: ${result.id.substring(0, 8)}...`);
            console.log(`   Especie: ${result.especie}`);
            console.log(`   Refugio: ${result.id_refugio}`);
            // Continuar con UPDATE después de INSERT
            continuarConUpdate(result.id);
        }
    });
}
// Función separada para UPDATE (Promises)
function continuarConUpdate(animalId) {
    console.log("\n" + "=".repeat(60) + "\n");
    console.log("✏️ === UPDATE - Promises ===");
    console.log(`🔄 Actualizando animal con ID: ${animalId.substring(0, 8)}...`);
    const datosActualizacion = {
        edad: 3,
        estado: "Excelente",
        descripcion: "Perro muy bien entrenado y sociable",
        estadoAdopcion: "En proceso"
    };
    // Crear nueva instancia del repositorio para UPDATE
    const repoUpdate = new AnimalRepoMemory();
    // Usar promises
    repoUpdate.update(animalId, datosActualizacion)
        .then((animalActualizado) => {
        console.log("✅ Animal actualizado exitosamente:");
        console.log(`   Nombre: ${animalActualizado.nombre}`);
        console.log(`   Nueva edad: ${animalActualizado.edad} años`);
        console.log(`   Nuevo estado: ${animalActualizado.estado}`);
        console.log(`   Estado adopción: ${animalActualizado.estadoAdopcion}`);
        // Continuar con DELETE
        continuarConDelete(animalId);
    })
        .catch((error) => {
        console.error("❌ Error al actualizar:", error.message);
    });
}
// Función separada para DELETE (Async/Await)
async function continuarConDelete(animalId) {
    console.log("\n" + "=".repeat(60) + "\n");
    console.log("🗑️ === DELETE - Async/Await ===");
    console.log(`🔄 Eliminando animal con ID: ${animalId.substring(0, 8)}...`);
    try {
        const eliminado = await new AnimalRepoMemory().delete(animalId);
        if (eliminado) {
            console.log("✅ Animal eliminado exitosamente");
        }
        else {
            console.log("❌ Animal no encontrado para eliminar");
        }
        // Mostrar resumen final
        await mostrarResumenFinal();
    }
    catch (error) {
        console.error("❌ Error al eliminar:", error);
    }
}
// Función para mostrar resumen final
async function mostrarResumenFinal() {
    console.log("\n" + "=".repeat(60) + "\n");
    console.log("📊 === RESUMEN FINAL ===");
    try {
        const repo = new AnimalRepoMemory();
        const animalesFinales = await repo.findAll();
        console.log(`✅ Total de animales en el repositorio: ${animalesFinales.length}`);
        // Estadísticas por estado de adopción
        const estadisticas = animalesFinales.reduce((acc, animal) => {
            acc[animal.estadoAdopcion] = (acc[animal.estadoAdopcion] || 0) + 1;
            return acc;
        }, {});
        console.log("\n📈 Estadísticas por estado de adopción:");
        Object.entries(estadisticas).forEach(([estado, cantidad]) => {
            console.log(`   ${estado}: ${cantidad} animales`);
        });
        console.log("\n🎉 ¡Todas las operaciones CRUD completadas exitosamente!");
        console.log("🔄 Paradigmas implementados:");
        console.log("   ✅ CREATE: Callbacks");
        console.log("   ✅ READ: Async/Await");
        console.log("   ✅ UPDATE: Promises");
        console.log("   ✅ DELETE: Async/Await");
    }
    catch (error) {
        console.error("❌ Error en resumen final:", error);
    }
}
// Ejecutar la aplicación
main().catch((error) => {
    console.error('❌ Error en la aplicación:', error);
});
//# sourceMappingURL=app.js.map