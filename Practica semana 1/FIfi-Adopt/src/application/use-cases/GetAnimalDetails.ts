import type { Animal } from "../../domain/entities/Animal"
import type { AnimalRepository } from "../../domain/repositories/AnimalRepository"

export class GetAnimalDetails {
  constructor(private animalRepository: AnimalRepository) {}

  async execute(animalId: string): Promise<Animal | null> {
    if (!animalId) {
      throw new Error("Animal ID is required")
    }

    const animal = await this.animalRepository.findById(animalId)

    if (!animal) {
      return null
    }

    return animal
  }
}
