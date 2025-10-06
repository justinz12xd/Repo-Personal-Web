import { v4 as uuidv4 } from "uuid";
// Factory function (recomendado para arquitectura hexagonal)
export function CreadorDeAnimal(data) {
    // Aquí puedes agregar validaciones de dominio si quieres
    ValidarDatosAnimal(data);
    return {
        id: uuidv4(),
        ...data
    };
}
// Validaciones de dominio (opcional)
function ValidarDatosAnimal(data) {
    if (!data.nombre?.trim())
        throw new Error("Nombre requerido");
    if (!data.especie?.trim())
        throw new Error("Especie requerida");
    if (data.edad < 0)
        throw new Error("Edad inválida");
    if (!Array.isArray(data.vacunas))
        throw new Error("Vacunas debe ser un array");
}
//# sourceMappingURL=animal.js.map