import type { NextRequest } from "next/server"
import { DIContainer } from "../../../../src/infrastructure/container/DIContainer"

const container = DIContainer.getInstance()
const campaignController = container.getCampaignController()

export async function POST(request: NextRequest) {
  return campaignController.donate(request)
}
