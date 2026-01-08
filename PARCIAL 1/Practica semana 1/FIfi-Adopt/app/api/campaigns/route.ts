import { DIContainer } from "../../../src/infrastructure/container/DIContainer"

const container = DIContainer.getInstance()
const campaignController = container.getCampaignController()

export async function GET() {
  return campaignController.getCampaigns()
}
