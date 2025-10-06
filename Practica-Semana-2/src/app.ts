import { AnimalRepoMemory } from "./Infraestructure/AnimalRepoMemory";
import { UsuarioRepoMemory } from "./Infraestructure/UsuarioRepoMemory";
import { DonacionRepoMemory } from "./Infraestructure/DonacionRepoMemory";
import { CompaniaRepoMemory } from "./Infraestructure/CampaniaRepoMemory";
import { AnimalCreador } from "./Domain/repositories/ianimal";

console.log("PRÁCTICA 2\n");

async function mostrarTodasLasEntidades(
    animalRepo: AnimalRepoMemory, 
    usuarioRepo: UsuarioRepoMemory, 
    donacionRepo: DonacionRepoMemory, 
    campaniaRepo: CompaniaRepoMemory
) {
    console.log(" RESUMEN DE TODAS LAS ENTIDADES\n");

    try {
        const animales = await animalRepo.findAll();
        console.log(` ANIMALES (${animales.length} registros):`);
        animales.slice(0, 3).forEach((animal, index) => {
            console.log(`   ${index + 1}. ${animal.nombre} (${animal.especie}) - Estado: ${animal.estadoAdopcion}`);
            console.log(`      Edad: ${animal.edad} años | Refugio: ${animal.id_refugio} | ID: ${animal.id.substring(0, 8)}...`);
        });
        if (animales.length > 3) {
            console.log(`   ... y ${animales.length - 3} animales más`);
        }
    } catch (error) {
        console.error(" Error cargando animales:", error);
    }

    console.log();

    try {
        console.log(`USUARIOS:`);
        if ('findAll' in usuarioRepo && typeof usuarioRepo.findAll === 'function') {
            const usuarios = await usuarioRepo.findAll();
            console.log(`   Total: ${usuarios.length} registros`);
            usuarios.slice(0, 3).forEach((usuario: any, index: number) => {
                console.log(`   ${index + 1}. ${usuario.nombre} (${usuario.rol})`);
                console.log(`      Email: ${usuario.email} | Tel: ${usuario.telefono || 'N/A'} | ID: ${usuario.id.substring(0, 8)}...`);
            });
            if (usuarios.length > 3) {
                console.log(`   ... y ${usuarios.length - 3} usuarios más`);
            }
        } else {
            console.log(`   Repositorio de usuarios inicializado (método findAll no disponible)`);
            console.log(`    Para ver usuarios, implementa el método findAll en UsuarioRepoMemory`);
        }
    } catch (error) {
        console.log(`    Repositorio de usuarios no disponible: ${error}`);
    }

    console.log();

    // DONACIONES - INTENTAR CARGAR
    try {
        console.log(` DONACIONES:`);
        if ('findAll' in donacionRepo && typeof donacionRepo.findAll === 'function') {
            const donaciones = await donacionRepo.findAll();
            console.log(`   Total: ${donaciones.length} registros`);
            donaciones.slice(0, 3).forEach((donacion: any, index: number) => {
                console.log(`   ${index + 1}. ${donacion.tipo_donacion} - $${donacion.cantidad} ${donacion.moneda}`);
                console.log(`      Donante: ${donacion.anonima ? 'Anónimo' : donacion.donante} | Estado: ${donacion.estado} | ID: ${donacion.id_donacion.substring(0, 8)}...`);
            });
            if (donaciones.length > 3) {
                console.log(`   ... y ${donaciones.length - 3} donaciones más`);
            }
        } else {
            console.log(` Repositorio de donaciones inicializado (método findAll no disponible)`);
            console.log(` Para ver donaciones, implementa el método findAll en DonacionRepoMemory`);
        }
    } catch (error) {
        console.log(`  Repositorio de donaciones no disponible: ${error}`);
    }

    console.log();

    try {
        console.log(` CAMPAÑAS:`);
        if ('findAll' in campaniaRepo && typeof campaniaRepo.findAll === 'function') {
            const campanias = await campaniaRepo.findAll();
            console.log(`   Total: ${campanias.length} registros`);
            campanias.slice(0, 3).forEach((campania: any, index: number) => {
                const fechaInicio = new Date(campania.fecha_inicio).toLocaleDateString();
                const fechaFin = new Date(campania.fecha_fin).toLocaleDateString();
                console.log(`   ${index + 1}. ${campania.titulo} (${campania.tipo_campania})`);
                console.log(`      ${fechaInicio} - ${fechaFin} | Lugar: ${campania.lugar} | Activa: ${campania.activo ? 'Sí' : 'No'} | ID: ${campania.id_campania.substring(0, 8)}...`);
            });
            if (campanias.length > 3) {
                console.log(`   ... y ${campanias.length - 3} campañas más`);
            }
        } else {
            console.log(`    Repositorio de campañas inicializado (método findAll no disponible)`);
            console.log(`    Para ver campañas, implementa el método findAll en CampaniaRepoMemory`);
        }
    } catch (error) {
        console.log(`   Repositorio de campañas no disponible: ${error}`);
    }

    console.log("\n === ESTADÍSTICAS GENERALES ===");
    try {
        const animales = await animalRepo.findAll();
        console.log(` Animales en el sistema: ${animales.length} registros`);
        
        // Estadísticas de animales
        const animalesDisponibles = animales.filter(a => a.estadoAdopcion === 'Disponible').length;
        const animalesAdoptados = animales.filter(a => a.estadoAdopcion === 'Adoptado').length;
        const animalesEnProceso = animales.filter(a => a.estadoAdopcion === 'En proceso').length;
        
        console.log(` Estado de adopción:`);
        console.log(`   • Disponibles: ${animalesDisponibles}`);
        console.log(`   • Adoptados: ${animalesAdoptados}`);
        console.log(`   • En proceso: ${animalesEnProceso}`);

        // Por especie
        const perros = animales.filter(a => a.especie === 'Perro').length;
        const gatos = animales.filter(a => a.especie === 'Gato').length;
        console.log(` Por especie:`);
        console.log(`   • Perros: ${perros}`);
        console.log(`   • Gatos: ${gatos}`);

        console.log(`\n Nota: Las otras entidades están inicializadas pero requieren implementar el método findAll para mostrar estadísticas completas.`);

    } catch (error) {
        console.error(" Error calculando estadísticas:", error);
    }
}

async function main() {
    console.log("=== DEMOSTRACIÓN DE TODAS LAS ENTIDADES ===\n");
    
    // Crear instancias de todos los repositorios
    const animalRepo = new AnimalRepoMemory();
    const usuarioRepo = new UsuarioRepoMemory();
    const donacionRepo = new DonacionRepoMemory();
    const campaniaRepo = new CompaniaRepoMemory();
    
    repoGlobal = animalRepo; // Para las operaciones CRUD detalladas
    
    console.log("Todos los repositorios inicializados con datos de prueba\n");


    await mostrarTodasLasEntidades(animalRepo, usuarioRepo, donacionRepo, campaniaRepo);
    
    console.log("\n" + "=".repeat(80) + "\n");
    console.log("=== DEMOSTRACIÓN CRUD DETALLADA - ANIMALES ===\n");


    console.log("=== READ - FINDALL (Async/Await) ===");
    try {
        const todosLosAnimales = await animalRepo.findAll();
        console.log(`Total de animales encontrados: ${todosLosAnimales.length}`);
        
        // Mostrar algunos ejemplos
        console.log("\n Primeros 3 animales:");
        todosLosAnimales.slice(0, 3).forEach((animal, index) => {
            console.log(`   ${index + 1}. ${animal.nombre} (${animal.especie}) - Estado: ${animal.estadoAdopcion} - ID: ${animal.id.substring(0, 8)}...`);
        });
    } catch (error) {
        console.error(" Error en findAll:", error);
    }

    console.log("\n" + "=".repeat(60) + "\n");


    console.log(" === READ - FINDBYID (Async/Await) ===");
    try {
        const animales = await animalRepo.findAll();
        if (animales.length === 0) {
            console.log(" No hay animales en el repositorio");
            return;
        }
        
        const primerAnimal = animales[0]!; // Sabemos que existe porque ya validamos la longitud
        console.log(`Buscando animal por ID: ${primerAnimal.id.substring(0, 8)}...`);
        const animalEncontrado = await animalRepo.findById(primerAnimal.id);
        
        if (animalEncontrado) {
            console.log(` Animal encontrado: ${animalEncontrado.nombre} (${animalEncontrado.especie})`);
            console.log(`   Edad: ${animalEncontrado.edad} años`);
            console.log(`   Estado: ${animalEncontrado.estadoAdopcion}`);
            console.log(`   Refugio: ${animalEncontrado.id_refugio}`);
        } else {
            console.log(" Animal no encontrado");
        }
    } catch (error) {
        console.error(" Error en findById:", error);
    }

    console.log("\n" + "=".repeat(60) + "\n");

 
    console.log("=== CREATE - INSERT (Callbacks) ===");
    
    const nuevoAnimal: AnimalCreador = {
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

    console.log(` Insertando nuevo animal: ${nuevoAnimal.nombre}...`);
    
    animalRepo.insert(nuevoAnimal, (err, result) => {
        if (err) {
            console.error(" Error al insertar:", err.message);
        } else {
            console.log(" Animal insertado exitosamente:");
            console.log(`   Nombre: ${result!.nombre}`);
            console.log(`   ID generado: ${result!.id.substring(0, 8)}...`);
            console.log(`   Especie: ${result!.especie}`);
            console.log(`   Refugio: ${result!.id_refugio}`);
            
            // Continuar con UPDATE después de INSERT
            continuarConUpdate(result!.id);
        }
    });
}

let repoGlobal: AnimalRepoMemory;

// Función separada para UPDATE (Promises)
function continuarConUpdate(animalId: string) {
    console.log("\n" + "=".repeat(60) + "\n");
    
    console.log("=== UPDATE - Promises ===");
    console.log(` Actualizando animal con ID: ${animalId.substring(0, 8)}...`);
    
    const datosActualizacion = {
        edad: 3,
        estado: "Excelente",
        descripcion: "Perro muy bien entrenado y sociable",
        estadoAdopcion: "En proceso"
    };
    
    // Usar promises con el repositorio global
    repoGlobal.update(animalId, datosActualizacion)
        .then((animalActualizado: any) => {
            console.log(" Animal actualizado exitosamente:");
            console.log(`   Nombre: ${animalActualizado.nombre}`);
            console.log(`   Nueva edad: ${animalActualizado.edad} años`);
            console.log(`   Nuevo estado: ${animalActualizado.estado}`);
            console.log(`   Estado adopción: ${animalActualizado.estadoAdopcion}`);
            
            // Continuar con DELETE
            continuarConDelete(animalId);
        })
        .catch((error: any) => {
            console.error(" Error al actualizar:", error.message);
        });
}

// Función separada para DELETE (Async/Await)
async function continuarConDelete(animalId: string) {
    console.log("\n" + "=".repeat(60) + "\n");
    
    console.log(" === DELETE - Async/Await ===");
    console.log(` Eliminando animal con ID: ${animalId.substring(0, 8)}...`);
    
    try {
        const eliminado = await repoGlobal.delete(animalId);
        
        if (eliminado) {
            console.log(" Animal eliminado exitosamente");
        } else {
            console.log("Animal no encontrado para eliminar");
        }
        
        // Mostrar resumen final
        await mostrarResumenFinal();
        
    } catch (error) {
        console.error(" Error al eliminar:", error);
    }
}

// Función para mostrar resumen final
async function mostrarResumenFinal() {
    console.log("\n" + "=".repeat(60) + "\n");
    
    console.log(" === RESUMEN FINAL ===");
    
    try {
        const animalesFinales = await repoGlobal.findAll();
        
        console.log(`Total de animales en el repositorio: ${animalesFinales.length}`);
        
        // Estadísticas por estado de adopción
        const estadisticas = animalesFinales.reduce((acc, animal) => {
            acc[animal.estadoAdopcion] = (acc[animal.estadoAdopcion] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        
        console.log("\n Estadísticas por estado de adopción:");
        Object.entries(estadisticas).forEach(([estado, cantidad]) => {
            console.log(`   ${estado}: ${cantidad} animales`);
        });
        
        console.log("\n¡Todas las operaciones CRUD completadas exitosamente!");
        console.log(" Paradigmas implementados:");
        console.log("   CREATE: Callbacks");
        console.log("   READ: Async/Await");
        console.log("   UPDATE: Promises");
        console.log("   DELETE: Async/Await");

    } catch (error) {
        console.error(" Error en resumen final:", error);
    }
}

// Ejecutar la aplicación
main().catch((error) => {
    console.error('Error en la aplicación:', error);
});
