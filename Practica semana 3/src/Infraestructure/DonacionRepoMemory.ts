import { IDonacionRepo, DonacionCreador, DonacionUpdate} from "../Domain/repositories/idonacion";
import { Donacion, CreadorDeDonacion} from "../Domain/entities/donacion";

export class DonacionRepoMemory implements IDonacionRepo {
    private donaciones: Donacion[] = [];

    constructor() {
        this.DonacionesDummy();
    }

    private DonacionesDummy() {
        const datos = [
            {
                tipo_donacion: "Monetaria",
                descripcion: "Donación para alimento de animales",
                cantidad: 100.00,
                moneda: "USD",
                fecha_donacion: new Date('2024-01-15'),
                donante: "Juan Pérez",
                beneficiario: "Refugio Manta Libre",
                metodo_pago: "Tarjeta de crédito",
                estado: "completada" as const,
                anonima: false
            },
            {
                tipo_donacion: "En especie",
                descripcion: "Alimento para perros - 20kg",
                cantidad: 20,
                moneda: "KG",
                fecha_donacion: new Date('2024-02-10'),
                donante: "María González",
                beneficiario: "Refugio Cuba Libre",
                metodo_pago: "Entrega directa",
                estado: "completada" as const,
                anonima: false
            },
            {
                tipo_donacion: "Monetaria",
                descripcion: "Donación para gastos veterinarios",
                cantidad: 250.00,
                moneda: "USD",
                fecha_donacion: new Date('2024-02-20'),
                donante: "Donante Anónimo",
                beneficiario: "Refugio San Francisco",
                metodo_pago: "Transferencia bancaria",
                estado: "completada" as const,
                anonima: true
            },
            {
                tipo_donacion: "Tiempo",
                descripcion: "Voluntariado para cuidado de animales",
                cantidad: 8,
                moneda: "HORAS",
                fecha_donacion: new Date('2024-03-01'),
                donante: "Carlos Rodríguez",
                beneficiario: "Refugio Nueva Esperanza",
                metodo_pago: "Tiempo voluntario",
                estado: "completada" as const,
                anonima: false
            },
            {
                tipo_donacion: "Monetaria",
                descripcion: "Donación mensual recurrente",
                cantidad: 50.00,
                moneda: "USD",
                fecha_donacion: new Date('2024-03-15'),
                donante: "Ana López",
                beneficiario: "Refugio Los Esteros",
                metodo_pago: "Débito automático",
                estado: "pendiente" as const,
                anonima: false
            },
            {
                tipo_donacion: "En especie",
                descripcion: "Medicamentos para tratamiento",
                cantidad: 5,
                moneda: "UNIDADES",
                fecha_donacion: new Date('2024-03-20'),
                donante: "Veterinaria Central",
                beneficiario: "Refugio Manta Canina",
                metodo_pago: "Donación directa",
                estado: "completada" as const,
                anonima: false
            }
        ];
        
        // Usa el factory para crear con ID automático
        this.donaciones.push(...datos.map(CreadorDeDonacion));
    }

    insert(DatosDonacion: DonacionCreador, callback: (err: Error | null, result?: Donacion) => void): void {
        setTimeout(() => {
            try {
                // Validar que los datos no estén vacíos
                if (!DatosDonacion) {
                    return callback(new Error("Datos de la donación son requeridos"));
                }

                // Crear la donación usando el factory (genera ID automáticamente)
                const nuevaDonacion = CreadorDeDonacion(DatosDonacion);

                // Verificar duplicados por donante, fecha y cantidad (regla de negocio)
                const existeDuplicado = this.donaciones.some(
                    d => d.donante.toLowerCase() === nuevaDonacion.donante.toLowerCase() && 
                         d.fecha_donacion.getTime() === nuevaDonacion.fecha_donacion.getTime() &&
                         d.cantidad === nuevaDonacion.cantidad
                );
                
                if (existeDuplicado) {
                    return callback(new Error(`Ya existe una donación idéntica de "${nuevaDonacion.donante}" en esta fecha`));
                }

                // Insertar en memoria
                this.donaciones.push(nuevaDonacion);
                
                // Éxito: callback(null, resultado)
                callback(null, nuevaDonacion);
                
            } catch (error) {
                // Error: callback(error)
                if (error instanceof Error) {
                    callback(error);
                } else {
                    callback(new Error("Error desconocido al insertar donación"));
                }
            }
        }, 500);
    }

    async findById(id: string): Promise<Donacion | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const donacion = this.donaciones.find(d => d.id_donacion === id) || null;
                resolve(donacion);
            }, 500);
        });
    }

    async findAll(): Promise<Donacion[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.donaciones);
            }, 500);
        });
    }

    async update(id: string, data: DonacionUpdate): Promise<Donacion> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    // Validar si entra o no un ID
                    if (!id || id.trim() === "") {
                        return reject(new Error("El ID es requerido"));
                    }

                    // Validar los campos a actualizar
                    if (!data || Object.keys(data).length === 0) {
                        return reject(new Error("Los datos que se van a actualizar son requeridos"));
                    }

                    // Buscar la donación por ID
                    const indice = this.donaciones.findIndex(d => d.id_donacion === id);
                    if (indice === -1) {
                        return reject(new Error("No se pudo encontrar la donación con el ID proporcionado"));
                    }

                    // Obtener la donación actual
                    const donacionActual = this.donaciones[indice]!;
                    
                    // Verificar duplicados si se actualiza información crítica
                    if (data.donante || data.fecha_donacion || data.cantidad) {
                        const donacionDuplicada = this.donaciones.some(
                            d => d.id_donacion !== id && 
                            d.donante.toLowerCase() === (data.donante || donacionActual.donante).toLowerCase() &&
                            d.fecha_donacion.getTime() === (data.fecha_donacion || donacionActual.fecha_donacion).getTime() &&
                            d.cantidad === (data.cantidad || donacionActual.cantidad)
                        );
                        if (donacionDuplicada) {
                            return reject(new Error("Ya existe una donación idéntica con estos datos"));
                        }
                    }
                    
                    // Crear la donación actualizada con todos los campos requeridos
                    const donacionActualizada: Donacion = {
                        id_donacion: donacionActual.id_donacion, // Preservar el ID original
                        tipo_donacion: data.tipo_donacion ?? donacionActual.tipo_donacion,
                        descripcion: data.descripcion ?? donacionActual.descripcion,
                        cantidad: data.cantidad ?? donacionActual.cantidad,
                        moneda: data.moneda ?? donacionActual.moneda,
                        fecha_donacion: data.fecha_donacion ?? donacionActual.fecha_donacion,
                        donante: data.donante ?? donacionActual.donante,
                        beneficiario: data.beneficiario ?? donacionActual.beneficiario,
                        metodo_pago: data.metodo_pago ?? donacionActual.metodo_pago,
                        estado: data.estado ?? donacionActual.estado,
                        anonima: data.anonima ?? donacionActual.anonima
                    };

                    // Guardar los cambios en el array
                    this.donaciones[indice] = donacionActualizada;

                    // Resolver la promesa con la donación actualizada
                    resolve(donacionActualizada);
                    
                } catch (error) {
                    // Manejar errores
                    if (error instanceof Error) {
                        reject(error);
                    } else {
                        reject(new Error("Error desconocido al actualizar donación"));
                    }
                }
            }, 500);
        });
    }

    async delete(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    // Validar ID
                    if (!id || id.trim() === "") {
                        return reject(new Error("ID de la donación es requerido"));
                    }

                    // Buscar la donación
                    const index = this.donaciones.findIndex(d => d.id_donacion === id);
                    if (index === -1) {
                        return resolve(false); // No encontrado, pero no es error
                    }

                    // Eliminar del array
                    this.donaciones.splice(index, 1);
                    resolve(true); // Eliminado exitosamente
                    
                } catch (error) {
                    if (error instanceof Error) {
                        reject(error);
                    } else {
                        reject(new Error("Error desconocido al eliminar donación"));
                    }
                }
            }, 500);
        });
    }

    // Métodos adicionales específicos para donaciones
    async findByDonante(donante: string): Promise<Donacion[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const donaciones = this.donaciones.filter(d => 
                    d.donante.toLowerCase().includes(donante.toLowerCase())
                );
                resolve(donaciones);
            }, 300);
        });
    }

    async findByBeneficiario(beneficiario: string): Promise<Donacion[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const donaciones = this.donaciones.filter(d => 
                    d.beneficiario.toLowerCase().includes(beneficiario.toLowerCase())
                );
                resolve(donaciones);
            }, 300);
        });
    }

    async findByEstado(estado: 'pendiente' | 'completada' | 'cancelada'): Promise<Donacion[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const donaciones = this.donaciones.filter(d => d.estado === estado);
                resolve(donaciones);
            }, 300);
        });
    }

    async findByFechaRango(fechaInicio: Date, fechaFin: Date): Promise<Donacion[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const donaciones = this.donaciones.filter(d => 
                    d.fecha_donacion >= fechaInicio && d.fecha_donacion <= fechaFin
                );
                resolve(donaciones);
            }, 300);
        });
    }

    async getTotalDonado(beneficiario?: string): Promise<number> {
        return new Promise((resolve) => {
            setTimeout(() => {
                let donacionesFiltradas = this.donaciones.filter(d => 
                    d.estado === 'completada' && d.tipo_donacion === 'Monetaria'
                );
                
                if (beneficiario) {
                    donacionesFiltradas = donacionesFiltradas.filter(d => 
                        d.beneficiario.toLowerCase().includes(beneficiario.toLowerCase())
                    );
                }
                
                const total = donacionesFiltradas.reduce((sum, d) => sum + d.cantidad, 0);
                resolve(total);
            }, 300);
        });
    }

    async getDonacionesAnonimas(): Promise<Donacion[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const donaciones = this.donaciones.filter(d => d.anonima === true);
                resolve(donaciones);
            }, 300);
        });
    }
}