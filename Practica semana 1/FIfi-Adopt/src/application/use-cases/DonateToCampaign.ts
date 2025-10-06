import type { CampaignRepository } from "../../domain/repositories/CampaignRepository"

export interface DonationData {
  campaignId: string
  amount: number
  donorName?: string
  donorEmail?: string
}

export class DonateToCampaign {
  constructor(private campaignRepository: CampaignRepository) {}

  async execute(donationData: DonationData): Promise<void> {
    if (donationData.amount <= 0) {
      throw new Error("Donation amount must be greater than zero")
    }

    const campaign = await this.campaignRepository.findById(donationData.campaignId)

    if (!campaign) {
      throw new Error("Campaign not found")
    }

    if (!campaign.isActive || campaign.isExpired()) {
      throw new Error("Campaign is not active or has expired")
    }

    // Add donation to campaign
    campaign.addDonation(donationData.amount)

    // Save updated campaign
    await this.campaignRepository.save(campaign)
  }
}
