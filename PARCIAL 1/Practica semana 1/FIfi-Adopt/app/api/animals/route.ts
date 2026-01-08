import type { NextRequest } from "next/server"
import { DIContainer } from "../../../src/infrastructure/container/DIContainer"

const container = DIContainer.getInstance()
const animalController = container.getAnimalController()

export async function GET(request: NextRequest) {
  return animalController.getAnimals(request)
}
