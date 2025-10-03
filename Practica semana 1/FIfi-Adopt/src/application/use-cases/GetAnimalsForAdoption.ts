import type { Animal } from "../../domain/entities/Animal"
import type { AnimalRepository, AnimalFilters } from "../../domain/repositories/AnimalRepository"

export class GetAnimalsForAdoption {
  constructor(private animalRepository: AnimalRepository) {}

  async execute(filters?: AnimalFilters): Promise<Animal[]> {
    const searchFilters: AnimalFilters = {
      ...filters,
      adoptionStatus: "available", // Always filter for available animals
    }

    const animals = await this.animalRepository.findByFilters(searchFilters)

    // Sort by creation date (newest first) and prioritize animals with special needs
    return animals.sort((a, b) => {
      // Prioritize animals with special needs
      if (a.healthStatus === "special_needs" && b.healthStatus !== "special_needs") {
        return -1
      }
      if (b.healthStatus === "special_needs" && a.healthStatus !== "special_needs") {
        return 1
      }

      // Then sort by creation date (newest first)
      return b.createdAt.getTime() - a.createdAt.getTime()
    })
  }
}
