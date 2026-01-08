import type { Animal } from "../../domain/entities/Animal"
import type { AnimalRepository, AnimalFilters } from "../../domain/repositories/AnimalRepository"
import { AnimalEntity } from "../../domain/entities/Animal"

export class InMemoryAnimalRepository implements AnimalRepository {
  private animals: Animal[] = [
    new AnimalEntity(
      "1",
      "Luna",
      "dog",
      2,
      "female",
      "medium",
      "Luna es una perrita muy cariñosa y juguetona. Le encanta correr en el parque y es excelente con niños.",
      "healthy",
      true,
      true,
      ["/happy-golden-retriever.png"],
      "Madrid, España",
      {
        shelterName: "Refugio Esperanza",
        contactPerson: "María García",
        phone: "+34 600 123 456",
        email: "maria@refugioesperanza.org",
        address: "Calle de la Esperanza 123, Madrid",
      },
      "available",
      new Date("2024-01-15"),
      new Date("2024-01-15"),
      "Golden Retriever Mix",
    ),
    new AnimalEntity(
      "2",
      "Milo",
      "cat",
      1,
      "male",
      "small",
      "Milo es un gatito muy tranquilo y cariñoso. Perfecto para apartamentos y familias tranquilas.",
      "healthy",
      true,
      true,
      ["/cute-orange-tabby-kitten.jpg"],
      "Barcelona, España",
      {
        contactPerson: "Ana López",
        phone: "+34 600 789 012",
        email: "ana.lopez@email.com",
        address: "Avenida Diagonal 456, Barcelona",
      },
      "available",
      new Date("2024-02-01"),
      new Date("2024-02-01"),
      "Tabby",
    ),
    new AnimalEntity(
      "3",
      "Rocky",
      "dog",
      4,
      "male",
      "large",
      "Rocky es un perro muy leal y protector. Ideal para familias con experiencia en perros grandes.",
      "needs_treatment",
      true,
      false,
      ["/friendly-mixed-breed-large-dog.jpg"],
      "Valencia, España",
      {
        shelterName: "Protectora Valencia",
        contactPerson: "Carlos Ruiz",
        phone: "+34 600 345 678",
        email: "carlos@protectoravalencia.org",
        address: "Calle Mayor 789, Valencia",
      },
      "available",
      new Date("2024-01-20"),
      new Date("2024-01-20"),
      "Mixed Breed",
    ),
  ]

  async findAll(): Promise<Animal[]> {
    return [...this.animals]
  }

  async findById(id: string): Promise<Animal | null> {
    const animal = this.animals.find((a) => a.id === id)
    return animal || null
  }

  async findByFilters(filters: AnimalFilters): Promise<Animal[]> {
    return this.animals.filter((animal) => {
      if (filters.species && animal.species !== filters.species) return false
      if (filters.size && animal.size !== filters.size) return false
      if (filters.adoptionStatus && animal.adoptionStatus !== filters.adoptionStatus) return false
      if (filters.location && !animal.location.toLowerCase().includes(filters.location.toLowerCase())) return false
      if (filters.age) {
        if (filters.age.min && animal.age < filters.age.min) return false
        if (filters.age.max && animal.age > filters.age.max) return false
      }
      return true
    })
  }

  async save(animal: Animal): Promise<void> {
    const index = this.animals.findIndex((a) => a.id === animal.id)
    if (index >= 0) {
      this.animals[index] = animal
    } else {
      this.animals.push(animal)
    }
  }

  async delete(id: string): Promise<void> {
    this.animals = this.animals.filter((a) => a.id !== id)
  }
}
