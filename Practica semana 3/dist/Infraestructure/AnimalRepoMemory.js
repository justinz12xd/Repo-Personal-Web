import { CreadorDeAnimal } from "../Domain/entities/animal";
export class AnimalRepoMemory {
    constructor() {
        this.animals = [];
        this.Animalestontos();
    }
    Animalestontos() {
        const datos = [
            {
                nombre: "Firulais",
                especie: "Perro",
                edad: 5,
                estado: "Saludable",
                vacunas: ["Rabia", "Parvovirus"],
                descripcion: "Un perro muy amigable",
                fotos: ["foto1.jpg"],
                estadoAdopcion: "Disponible",
                id_refugio: "refugio1"
            },
            {
                nombre: "Luna",
                especie: "Gato",
                edad: 3,
                estado: "Saludable",
                vacunas: ["Triple Felina", "Rabia"],
                descripcion: "Gata muy cariñosa y juguetona",
                fotos: ["luna1.jpg", "luna2.jpg"],
                estadoAdopcion: "Disponible",
                id_refugio: "refugio2"
            },
            {
                nombre: "Max",
                especie: "Perro",
                edad: 2,
                estado: "En tratamiento",
                vacunas: ["Rabia"],
                descripcion: "Cachorro energético, necesita entrenamiento",
                fotos: ["max1.jpg"],
                estadoAdopcion: "En proceso",
                id_refugio: "refugio1"
            },
            {
                nombre: "Mimi",
                especie: "Gato",
                edad: 7,
                estado: "Saludable",
                vacunas: ["Triple Felina", "Leucemia Felina"],
                descripcion: "Gata mayor muy tranquila, ideal para apartamento",
                fotos: ["mimi1.jpg", "mimi2.jpg", "mimi3.jpg"],
                estadoAdopcion: "Disponible",
                id_refugio: "refugio3"
            },
            {
                nombre: "Rocky",
                especie: "Perro",
                edad: 4,
                estado: "Saludable",
                vacunas: ["Rabia", "Parvovirus", "Moquillo"],
                descripcion: "Perro guardián muy leal y protector",
                fotos: ["rocky1.jpg"],
                estadoAdopcion: "Adoptado",
                id_refugio: "refugio2"
            },
            {
                nombre: "Nala",
                especie: "Gato",
                edad: 1,
                estado: "Saludable",
                vacunas: ["Triple Felina"],
                descripcion: "Gatita bebé muy curiosa y activa",
                fotos: ["nala1.jpg", "nala2.jpg"],
                estadoAdopcion: "Disponible",
                id_refugio: "refugio1"
            },
            {
                nombre: "Toby",
                especie: "Perro",
                edad: 6,
                estado: "Saludable",
                vacunas: ["Rabia", "Parvovirus", "Hepatitis"],
                descripcion: "Perro maduro muy obediente y calmado",
                fotos: ["toby1.jpg"],
                estadoAdopcion: "En proceso",
                id_refugio: "refugio3"
            },
            {
                nombre: "Simba",
                especie: "Gato",
                edad: 4,
                estado: "Saludable",
                vacunas: ["Triple Felina", "Rabia", "Leucemia Felina"],
                descripcion: "Gato grande y majestuoso, muy independiente",
                fotos: ["simba1.jpg", "simba2.jpg"],
                estadoAdopcion: "Disponible",
                id_refugio: "refugio2"
            },
            {
                nombre: "Bella",
                especie: "Perro",
                edad: 3,
                estado: "Saludable",
                vacunas: ["Rabia", "Parvovirus"],
                descripcion: "Perra muy dulce y sociable con niños",
                fotos: ["bella1.jpg", "bella2.jpg", "bella3.jpg"],
                estadoAdopcion: "Disponible",
                id_refugio: "refugio1"
            },
            {
                nombre: "Coco",
                especie: "Gato",
                edad: 5,
                estado: "En tratamiento",
                vacunas: ["Triple Felina"],
                descripcion: "Gato rescatado, en recuperación pero muy amoroso",
                fotos: ["coco1.jpg"],
                estadoAdopcion: "No disponible",
                id_refugio: "refugio3"
            }
        ];
        // Usa el factory para crear con ID automático
        this.animals.push(...datos.map(CreadorDeAnimal));
    }
    insert(DatosAnimal, callback) {
        setTimeout(() => {
            try {
                // Validar que los datos no estén vacíos
                if (!DatosAnimal) {
                    return callback(new Error("Datos del animal son requeridos"));
                }
                // Crear el animal usando el factory (genera ID automáticamente)
                const nuevoAnimal = CreadorDeAnimal(DatosAnimal);
                // Verificar duplicados por nombre y refugio (regla de negocio)
                const existeDuplicado = this.animals.some(a => a.nombre.toLowerCase() === nuevoAnimal.nombre.toLowerCase() &&
                    a.id_refugio === nuevoAnimal.id_refugio);
                if (existeDuplicado) {
                    return callback(new Error(`Ya existe un animal con el nombre "${nuevoAnimal.nombre}" en este refugio`));
                }
                // Insertar en memoria
                this.animals.push(nuevoAnimal);
                // Éxito: callback(null, resultado)
                callback(null, nuevoAnimal);
            }
            catch (error) {
                // Error: callback(error)
                if (error instanceof Error) {
                    callback(error);
                }
                else {
                    callback(new Error("Error desconocido al insertar animal"));
                }
            }
        }, 500);
    }
    async findById(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const animal = this.animals.find(a => a.id === id) || null;
                resolve(animal);
            }, 500);
        });
    }
    async findAll() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.animals);
            }, 500);
        });
    }
    async update(id, data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    //Aqui se valida si entra o no un ID
                    if (!id || id.trim() === "") {
                        return reject(new Error("EL ID es requerido"));
                    }
                    //Aqui voy a validar lo que son los objetos o campos a actualizar
                    if (!data || Object.keys(data).length === 0) {
                        return reject(new Error("Los datos que se van a actualizar son requeridos"));
                    }
                    //Buscar el animal por ID(se crea una nueva busqueda para evitar conflictos)
                    const indice = this.animals.findIndex(a => a.id === id);
                    if (indice === -1) {
                        return reject(new Error("No se pudo encontrar el animal con el ID proporcionado"));
                    }
                    // Obtener el animal actual (sabemos que existe porque ya validamos el índice)
                    const animalActual = this.animals[indice]; // Assertion operator
                    //Ahora se verifica si el animal esta duplicado
                    if (data.nombre) {
                        const animalDuplicado = this.animals.some(a => a.id !== id &&
                            a.nombre.toLowerCase() === data.nombre.toLowerCase() &&
                            a.id_refugio === (data.id_refugio || animalActual.id_refugio));
                        if (animalDuplicado) {
                            return reject(new Error(`Ya existe un animal con el nombre "${data.nombre}" en este refugio`));
                        }
                    }
                    // Crear el animal actualizado con todos los campos requeridos
                    const animalActualizado = {
                        id: animalActual.id, // Preservar el ID original
                        nombre: data.nombre ?? animalActual.nombre,
                        especie: data.especie ?? animalActual.especie,
                        edad: data.edad ?? animalActual.edad,
                        estado: data.estado ?? animalActual.estado,
                        vacunas: data.vacunas ?? animalActual.vacunas,
                        descripcion: data.descripcion ?? animalActual.descripcion,
                        fotos: data.fotos ?? animalActual.fotos,
                        estadoAdopcion: data.estadoAdopcion ?? animalActual.estadoAdopcion,
                        id_refugio: data.id_refugio ?? animalActual.id_refugio
                    };
                    // Guardar los cambios en el array
                    this.animals[indice] = animalActualizado;
                    // Resolver la promesa con el animal actualizado
                    resolve(animalActualizado);
                }
                catch (error) {
                    // Manejar errores
                    if (error instanceof Error) {
                        reject(error);
                    }
                    else {
                        reject(new Error("Error desconocido al actualizar animal"));
                    }
                }
            }, 500);
        });
    }
    // DELETE - Async/Await (faltaba implementar)
    async delete(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    // Validar ID
                    if (!id || id.trim() === "") {
                        return reject(new Error("ID del animal es requerido"));
                    }
                    // Buscar el animal
                    const index = this.animals.findIndex(a => a.id === id);
                    if (index === -1) {
                        return resolve(false); // No encontrado, pero no es error
                    }
                    // Eliminar del array
                    this.animals.splice(index, 1);
                    resolve(true); // Eliminado exitosamente
                }
                catch (error) {
                    if (error instanceof Error) {
                        reject(error);
                    }
                    else {
                        reject(new Error("Error desconocido al eliminar animal"));
                    }
                }
            }, 500);
        });
    }
}
//# sourceMappingURL=AnimalRepoMemory.js.map