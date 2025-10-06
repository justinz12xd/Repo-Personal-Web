import { AnimalService } from "../Aplication/AnimalService";
import { UsuarioService } from "../Aplication/UsuarioService";
import { DonacionService } from "../Aplication/DonacionService";
import { CampaniaService } from "../Aplication/CampaniaService";
import { EspecieService } from "../Aplication/EspecieService";
import { RefugioService } from "../Aplication/RefugioService";
import { TipoCampaniaService } from "../Aplication/TipoCampaniaService";

export class DatabaseSeeder {
    private animalService: AnimalService;
    private usuarioService: UsuarioService;
    private donacionService: DonacionService;
    private campaniaService: CampaniaService;
    private especieService: EspecieService;
    private refugioService: RefugioService;
    private tipoCampaniaService: TipoCampaniaService;

    constructor() {
        this.animalService = new AnimalService();
        this.usuarioService = new UsuarioService();
        this.donacionService = new DonacionService();
        this.campaniaService = new CampaniaService();
        this.especieService = new EspecieService();
        this.refugioService = new RefugioService();
        this.tipoCampaniaService = new TipoCampaniaService();
    }

    async seedDatabase(): Promise<void> {
        console.log("Aqui inicia lo que vendria a ser el seeding");

        try {
            // 1. Crear esecies (verificar si ya existen)
            console.log("Verificando/Creando especies...");
            let especiePerro = await this.especieService.findByNombre("Perro");
            if (!especiePerro) {
                especiePerro = await this.especieService.create("Perro");
            }
            
            let especieGato = await this.especieService.findByNombre("Gato");
            if (!especieGato) {
                especieGato = await this.especieService.create("Gato");
            }
            
            let especieConejo = await this.especieService.findByNombre("Conejo");
            if (!especieConejo) {
                especieConejo = await this.especieService.create("Conejo");
            }
            console.log(` Especies disponibles: ${especiePerro.nombre}, ${especieGato.nombre}, ${especieConejo.nombre}`);

            // 2. Crear refugios (verificar si ya existen)
            console.log(" Verificando/Creando refugios...");
            let refugio1 = await this.refugioService.findByNombre("Refugio San Francisco");
            if (!refugio1) {
                refugio1 = await this.refugioService.create(
                    "Refugio San Francisco", 
                    "Calle Principal 123", 
                    "555-0001", 
                    "Refugio dedicado al cuidado de animales abandonados"
                );
            }
            
            let refugio2 = await this.refugioService.findByNombre("Hogar Animal");
            if (!refugio2) {
                refugio2 = await this.refugioService.create(
                    "Hogar Animal", 
                    "Av. Libertad 456", 
                    "555-0002", 
                    "Centro de rescate y rehabilitación animal"
                );
            }
            console.log(`Refugios disponibles: ${refugio1.nombre}, ${refugio2.nombre}`);

            // 3. Crear tipos de campaña (verificar si ya existen)
            console.log(" Verificando/Creando tipos de campaña...");
            let tipoAdopcion = await this.tipoCampaniaService.findByNombre("Adopción");
            if (!tipoAdopcion) {
                tipoAdopcion = await this.tipoCampaniaService.create(
                    "Adopción", 
                    "Campañas enfocadas en encontrar hogares para animales"
                );
            }
            
            let tipoRecaudacion = await this.tipoCampaniaService.findByNombre("Recaudación");
            if (!tipoRecaudacion) {
                tipoRecaudacion = await this.tipoCampaniaService.create(
                    "Recaudación", 
                    "Campañas para recaudar fondos para el refugio"
                );
            }
            console.log(` Tipos de campaña disponibles: ${tipoAdopcion.nombre}, ${tipoRecaudacion.nombre}`);

            // 4. Crear usuarios (verificar si ya existen)
            console.log(" Verificando/Creando usuarios...");
            let usuario1 = await this.usuarioService.findByEmail("maria.gonzalez@email.com");
            if (!usuario1) {
                usuario1 = await this.usuarioService.create({
                    nombre: "María González",
                    email: "maria.gonzalez@email.com",
                    contrasenia: "password123",
                    telefono: "555-1001",
                    direccion: "Calle Luna 789"
                });
            }

            let usuario2 = await this.usuarioService.findByEmail("carlos.rodriguez@email.com");
            if (!usuario2) {
                usuario2 = await this.usuarioService.create({
                    nombre: "Carlos Rodríguez",
                    email: "carlos.rodriguez@email.com",
                    contrasenia: "password456",
                    telefono: "555-1002",
                    direccion: "Av. Sol 321"
                });
            }

            let usuario3 = await this.usuarioService.findByEmail("ana.lopez@email.com");
            if (!usuario3) {
                usuario3 = await this.usuarioService.create({
                    nombre: "Ana López",
                    email: "ana.lopez@email.com",
                    contrasenia: "password789"
                });
            }
            console.log(` Usuarios disponibles: ${usuario1.nombre}, ${usuario2.nombre}, ${usuario3.nombre}`);

            // 5. Verificar/Crear animales
            console.log(" Verificando/Creando animales...");
            const allAnimals = await this.animalService.findAll();
            
            let animal1, animal2, animal3;
            
            // Verificar si los animales ya existen por nombre
            const existingMax = allAnimals.find(a => a.nombre === "Max");
            if (!existingMax) {
                animal1 = await this.animalService.create({
                    nombre: "Max",
                    edad: "2 años",
                    estado: "Saludable",
                    descripcion: "Perro muy amigable y juguetón",
                    fotos: ["max1.jpg", "max2.jpg"],
                    estado_adopcion: "Disponible",
                    id_especie: especiePerro.id_especie,
                    id_refugio: refugio1.id_refugio
                });
                console.log(`    Animal creado: ${animal1.nombre}`);
            } else {
                animal1 = existingMax;
                console.log(`     Animal existente: ${animal1.nombre}`);
            }

            const existingLuna = allAnimals.find(a => a.nombre === "Luna");
            if (!existingLuna) {
                animal2 = await this.animalService.create({
                    nombre: "Luna",
                    edad: "1 año",
                    estado: "Saludable",
                    descripcion: "Gata muy cariñosa y tranquila",
                    fotos: ["luna1.jpg"],
                    estado_adopcion: "Disponible",
                    id_especie: especieGato.id_especie,
                    id_refugio: refugio1.id_refugio
                });
                console.log(`    Animal creado: ${animal2.nombre}`);
            } else {
                animal2 = existingLuna;
                console.log(`     Animal existente: ${animal2.nombre}`);
            }

            const existingCoco = allAnimals.find(a => a.nombre === "Coco");
            if (!existingCoco) {
                animal3 = await this.animalService.create({
                    nombre: "Coco",
                    edad: "6 meses",
                    estado: "En tratamiento",
                    descripcion: "Conejo rescatado, necesita cuidados especiales",
                    estado_adopcion: "No disponible",
                    id_especie: especieConejo.id_especie,
                    id_refugio: refugio2.id_refugio
                });
                console.log(`    Animal creado: ${animal3.nombre}`);
            } else {
                animal3 = existingCoco;
                console.log(`     Animal existente: ${animal3.nombre}`);
            }
            console.log(` Animales disponibles: ${animal1.nombre}, ${animal2.nombre}, ${animal3.nombre}`);

            // 6. Verificar/Crear campañas
            console.log("Verificando/Creando campañas...");
            const allCampaigns = await this.campaniaService.findAll();
            
            let campania1, campania2;
            
            const existingAdopcion = allCampaigns.find(c => c.titulo === "Adopta un Amigo");
            if (!existingAdopcion) {
                campania1 = await this.campaniaService.create({
                    titulo: "Adopta un Amigo",
                    descripcion: "Campaña de adopción de mascotas abandonadas",
                    fecha_inicio: new Date(),
                    fecha_fin: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
                    lugar: "Refugio San Francisco",
                    organizador: "María González",
                    estado: "activa",
                    id_tipo_campania: tipoAdopcion.id_tipo_campania
                });
                console.log(`    Campaña creada: ${campania1.titulo}`);
            } else {
                campania1 = existingAdopcion;
                console.log(`     Campaña existente: ${campania1.titulo}`);
            }

            const existingRecaudacion = allCampaigns.find(c => c.titulo === "Ayuda a Coco");
            if (!existingRecaudacion) {
                campania2 = await this.campaniaService.create({
                    titulo: "Ayuda a Coco",
                    descripcion: "Recaudación de fondos para el tratamiento médico de Coco",
                    fecha_inicio: new Date(),
                    fecha_fin: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 días
                    lugar: "Hogar Animal",
                    organizador: "Carlos Rodríguez",
                    estado: "activa",
                    id_tipo_campania: tipoRecaudacion.id_tipo_campania
                });
                console.log(`    Campaña creada: ${campania2.titulo}`);
            } else {
                campania2 = existingRecaudacion;
                console.log(`     Campaña existente: ${campania2.titulo}`);
            }
            console.log(` Campañas disponibles: ${campania1.titulo}, ${campania2.titulo}`);

            // 7. Verificar/Crear donaciones
            console.log(" Verificando/Creando donaciones...");
            const allDonations = await this.donacionService.findAll();
            
            // Solo crear donaciones si no hay suficientes (menos de 3 donaciones base)
            const donationsNeeded = Math.max(0, 3 - allDonations.length);
            
            if (donationsNeeded > 0) {
                const donationsToCreate = [
                    { monto: 50.00, id_usuario: usuario1.id_usuario },
                    { monto: 100.00, id_usuario: usuario2.id_usuario },
                    { monto: 25.00, id_usuario: usuario3.id_usuario }
                ];

                for (let i = 0; i < donationsNeeded && i < donationsToCreate.length; i++) {
                    const donacionData = donationsToCreate[i];
                    if (donacionData) {
                        const donacion = await this.donacionService.create(donacionData);
                        console.log(`    Donación creada: $${donacion.monto}`);
                    }
                }
                console.log(` ${donationsNeeded} donaciones creadas`);
            } else {
                console.log(`  Ya existen ${allDonations.length} donaciones, no se crean nuevas`);
            }
            
            const finalDonationCount = await this.donacionService.findAll();
            console.log(`Total donaciones disponibles: ${finalDonationCount.length}`);

            console.log("¡Seeding completado exitosamente!");

        } catch (error) {
            console.error( "Error durante el seeding:", error);
            throw error;
        }
    }
}