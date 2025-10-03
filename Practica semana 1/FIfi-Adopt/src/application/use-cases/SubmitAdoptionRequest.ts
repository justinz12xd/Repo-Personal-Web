import { AdoptionRequestEntity } from "../../domain/entities/AdoptionRequest"
import type { AnimalRepository } from "../../domain/repositories/AnimalRepository"

export interface AdoptionRequestData {
  animalId: string
  applicantName: string
  applicantEmail: string
  applicantPhone: string
  applicantAddress: string
  hasExperience: boolean
  hasOtherPets: boolean
  livingSpace: "apartment" | "house_small_yard" | "house_large_yard" | "farm"
  reasonForAdoption: string
}

export class SubmitAdoptionRequest {
  constructor(private animalRepository: AnimalRepository) {}

  async execute(requestData: AdoptionRequestData): Promise<AdoptionRequestEntity> {
    // Validate that the animal exists and is available
    const animal = await this.animalRepository.findById(requestData.animalId)

    if (!animal) {
      throw new Error("Animal not found")
    }

    if (!animal.isAvailableForAdoption()) {
      throw new Error("Animal is not available for adoption")
    }

    // Validate required fields
    if (!requestData.applicantName || !requestData.applicantEmail || !requestData.applicantPhone) {
      throw new Error("Missing required applicant information")
    }

    // Create adoption request
    const adoptionRequest = new AdoptionRequestEntity(
      this.generateId(),
      requestData.animalId,
      requestData.applicantName,
      requestData.applicantEmail,
      requestData.applicantPhone,
      requestData.applicantAddress,
      requestData.hasExperience,
      requestData.hasOtherPets,
      requestData.livingSpace,
      requestData.reasonForAdoption,
    )

    // Mark animal as pending
    animal.markAsPending()
    await this.animalRepository.save(animal)

    return adoptionRequest
  }

  private generateId(): string {
    return `adoption_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}
