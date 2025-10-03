import type { Shelter } from "../../domain/entities/Shelter"
import type { ShelterRepository } from "../../domain/repositories/ShelterRepository"

export class GetShelterInformation {
  constructor(private shelterRepository: ShelterRepository) {}

  async execute(): Promise<Shelter[]> {
    const shelters = await this.shelterRepository.findAll()

    // Sort by verification status and rating
    return shelters.sort((a, b) => {
      // Verified shelters first
      if (a.isVerified && !b.isVerified) {
        return -1
      }
      if (b.isVerified && !a.isVerified) {
        return 1
      }

      // Then by rating (highest first)
      return b.rating - a.rating
    })
  }
}
