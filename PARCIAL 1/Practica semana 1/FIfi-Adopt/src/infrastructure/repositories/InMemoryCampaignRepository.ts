import type { Campaign, CampaignCategory } from "../../domain/entities/Campaign"
import type { CampaignRepository } from "../../domain/repositories/CampaignRepository"
import { CampaignEntity } from "../../domain/entities/Campaign"

export class InMemoryCampaignRepository implements CampaignRepository {
  private campaigns: Campaign[] = [
    new CampaignEntity(
      "1",
      "Cirugía urgente para Max",
      "Max necesita una cirugía de cadera urgente para poder caminar sin dolor. Es un perro joven con muchas ganas de vivir.",
      2500,
      1850,
      "medical_treatment",
      "critical",
      "1",
      ["/injured-dog-needing-medical-care.jpg"],
      new Date("2024-01-01"),
      new Date("2024-03-01"),
      true,
      new Date("2024-01-01"),
      new Date("2024-02-15"),
      "3",
    ),
    new CampaignEntity(
      "2",
      "Alimento para el invierno",
      "Necesitamos fondos para comprar alimento suficiente para todos nuestros animales durante los meses de invierno.",
      5000,
      3200,
      "food_supplies",
      "high",
      "1",
      ["/animal-food-supplies-and-shelter.jpg"],
      new Date("2024-01-15"),
      new Date("2024-04-15"),
      true,
      new Date("2024-01-15"),
      new Date("2024-02-10"),
    ),
    new CampaignEntity(
      "3",
      "Renovación del refugio",
      "Queremos mejorar las instalaciones para ofrecer un mejor ambiente a nuestros animales rescatados.",
      8000,
      2100,
      "shelter_maintenance",
      "medium",
      "2",
      ["/animal-shelter-renovation-project.jpg"],
      new Date("2024-02-01"),
      new Date("2024-06-01"),
      true,
      new Date("2024-02-01"),
      new Date("2024-02-05"),
    ),
    new CampaignEntity(
      "4",
      "Campaña de esterilización",
      "Programa de esterilización gratuita para controlar la población de animales callejeros en la comunidad.",
      3500,
      3500,
      "vaccination_drive",
      "low",
      "3",
      ["/veterinary-sterilization-campaign.jpg"],
      new Date("2024-01-10"),
      new Date("2024-03-10"),
      true,
      new Date("2024-01-10"),
      new Date("2024-02-20"),
    ),
  ]

  async findAll(): Promise<Campaign[]> {
    return [...this.campaigns]
  }

  async findById(id: string): Promise<Campaign | null> {
    const campaign = this.campaigns.find((c) => c.id === id)
    return campaign || null
  }

  async findByCategory(category: CampaignCategory): Promise<Campaign[]> {
    return this.campaigns.filter((campaign) => campaign.category === category)
  }

  async findActive(): Promise<Campaign[]> {
    return this.campaigns.filter((campaign) => campaign.isActive && !campaign.isExpired())
  }

  async save(campaign: Campaign): Promise<void> {
    const index = this.campaigns.findIndex((c) => c.id === campaign.id)
    if (index >= 0) {
      this.campaigns[index] = campaign
    } else {
      this.campaigns.push(campaign)
    }
  }

  async delete(id: string): Promise<void> {
    this.campaigns = this.campaigns.filter((c) => c.id !== id)
  }
}
