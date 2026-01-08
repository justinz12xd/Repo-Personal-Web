import { InMemoryAnimalRepository } from "../repositories/InMemoryAnimalRepository"
import { InMemoryShelterRepository } from "../repositories/InMemoryShelterRepository"
import { InMemoryCampaignRepository } from "../repositories/InMemoryCampaignRepository"
import { GetAnimalsForAdoption } from "../../application/use-cases/GetAnimalsForAdoption"
import { GetAnimalDetails } from "../../application/use-cases/GetAnimalDetails"
import { GetActiveCampaigns } from "../../application/use-cases/GetActiveCampaigns"
import { GetShelterInformation } from "../../application/use-cases/GetShelterInformation"
import { SubmitAdoptionRequest } from "../../application/use-cases/SubmitAdoptionRequest"
import { DonateToCampaign } from "../../application/use-cases/DonateToCampaign"
import { AnimalController } from "../controllers/AnimalController"
import { CampaignController } from "../controllers/CampaignController"

export class DIContainer {
  private static instance: DIContainer

  // Repositories
  private animalRepository = new InMemoryAnimalRepository()
  private shelterRepository = new InMemoryShelterRepository()
  private campaignRepository = new InMemoryCampaignRepository()

  // Use Cases
  private getAnimalsForAdoption = new GetAnimalsForAdoption(this.animalRepository)
  private getAnimalDetails = new GetAnimalDetails(this.animalRepository)
  private getActiveCampaigns = new GetActiveCampaigns(this.campaignRepository)
  private getShelterInformation = new GetShelterInformation(this.shelterRepository)
  private submitAdoptionRequest = new SubmitAdoptionRequest(this.animalRepository)
  private donateToCampaign = new DonateToCampaign(this.campaignRepository)

  // Controllers
  private animalController = new AnimalController(this.getAnimalsForAdoption, this.getAnimalDetails)
  private campaignController = new CampaignController(this.getActiveCampaigns, this.donateToCampaign)

  private constructor() {}

  public static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer()
    }
    return DIContainer.instance
  }

  // Repository getters
  public getAnimalRepository() {
    return this.animalRepository
  }

  public getShelterRepository() {
    return this.shelterRepository
  }

  public getCampaignRepository() {
    return this.campaignRepository
  }

  // Use case getters
  public getGetAnimalsForAdoption() {
    return this.getAnimalsForAdoption
  }

  public getGetAnimalDetails() {
    return this.getAnimalDetails
  }

  public getGetActiveCampaigns() {
    return this.getActiveCampaigns
  }

  public getGetShelterInformation() {
    return this.getShelterInformation
  }

  public getSubmitAdoptionRequest() {
    return this.submitAdoptionRequest
  }

  public getDonateToCampaign() {
    return this.donateToCampaign
  }

  // Controller getters
  public getAnimalController() {
    return this.animalController
  }

  public getCampaignController() {
    return this.campaignController
  }
}
