import { DIContainer } from "../../../../src/infrastructure/container/DIContainer"

const container = DIContainer.getInstance()
const animalController = container.getAnimalController()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  return animalController.getAnimalById(params.id)
}
