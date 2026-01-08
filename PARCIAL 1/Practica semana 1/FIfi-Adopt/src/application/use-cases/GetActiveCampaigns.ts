import type { Campaign } from "../../domain/entities/Campaign"
import type { CampaignRepository } from "../../domain/repositories/CampaignRepository"

export class GetActiveCampaigns {
  constructor(private campaignRepository: CampaignRepository) {}

  async execute(): Promise<Campaign[]> {
    const campaigns = await this.campaignRepository.findActive()

    // Sort by urgency level and progress
    return campaigns.sort((a, b) => {
      // First, sort by urgency level
      const urgencyOrder = { critical: 4, high: 3, medium: 2, low: 1 }
      const urgencyDiff = urgencyOrder[b.urgencyLevel] - urgencyOrder[a.urgencyLevel]

      if (urgencyDiff !== 0) {
        return urgencyDiff
      }

      // Then by progress (campaigns closer to goal first)
      const aProgress = (a.currentAmount / a.goalAmount) * 100
      const bProgress = (b.currentAmount / b.goalAmount) * 100

      return bProgress - aProgress
    })
  }
}
