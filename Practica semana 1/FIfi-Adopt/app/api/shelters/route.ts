import { NextResponse } from "next/server"
import { DIContainer } from "../../../src/infrastructure/container/DIContainer"

export async function GET() {
  try {
    const container = DIContainer.getInstance()
    const getShelterInformation = container.getGetShelterInformation()

    const shelters = await getShelterInformation.execute()
    return NextResponse.json(shelters)
  } catch (error) {
    console.error("Error fetching shelters:", error)
    return NextResponse.json({ error: "Failed to fetch shelters" }, { status: 500 })
  }
}
