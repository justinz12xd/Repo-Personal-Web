import type { Campaign, CampaignCategory } from "../entities/Campaign"

export interface CampaignRepository {
  findAll(): Promise<Campaign[]>
  findById(id: string): Promise<Campaign | null>
  findByCategory(category: CampaignCategory): Promise<Campaign[]>
  findActive(): Promise<Campaign[]>
  save(campaign: Campaign): Promise<void>
  delete(id: string): Promise<void>
}
