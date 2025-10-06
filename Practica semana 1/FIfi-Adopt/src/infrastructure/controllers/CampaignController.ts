import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import type { GetActiveCampaigns } from "../../application/use-cases/GetActiveCampaigns"
import type { DonateToCampaign } from "../../application/use-cases/DonateToCampaign"

export class CampaignController {
  constructor(
    private getActiveCampaigns: GetActiveCampaigns,
    private donateToCampaign: DonateToCampaign,
  ) {}

  async getCampaigns(): Promise<NextResponse> {
    try {
      const campaigns = await this.getActiveCampaigns.execute()
      return NextResponse.json(campaigns)
    } catch (error) {
      console.error("Error fetching campaigns:", error)
      return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 })
    }
  }

  async donate(request: NextRequest): Promise<NextResponse> {
    try {
      const body = await request.json()
      const { campaignId, amount, donorName, donorEmail } = body

      if (!campaignId || !amount) {
        return NextResponse.json({ error: "Campaign ID and amount are required" }, { status: 400 })
      }

      await this.donateToCampaign.execute({
        campaignId,
        amount: Number.parseFloat(amount),
        donorName,
        donorEmail,
      })

      return NextResponse.json({ success: true, message: "Donation successful" })
    } catch (error) {
      console.error("Error processing donation:", error)
      return NextResponse.json({ error: "Failed to process donation" }, { status: 500 })
    }
  }
}
