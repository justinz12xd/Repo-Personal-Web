import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import type { GetAnimalsForAdoption } from "../../application/use-cases/GetAnimalsForAdoption"
import type { GetAnimalDetails } from "../../application/use-cases/GetAnimalDetails"
import type { AnimalFilters } from "../../domain/repositories/AnimalRepository"

export class AnimalController {
  constructor(
    private getAnimalsForAdoption: GetAnimalsForAdoption,
    private getAnimalDetails: GetAnimalDetails,
  ) {}

  async getAnimals(request: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(request.url)

      const filters: AnimalFilters = {
        species: searchParams.get("species") as "dog" | "cat" | "other" | undefined,
        size: searchParams.get("size") as "small" | "medium" | "large" | undefined,
        location: searchParams.get("location") || undefined,
      }

      // Handle age filters
      const minAge = searchParams.get("minAge")
      const maxAge = searchParams.get("maxAge")
      if (minAge || maxAge) {
        filters.age = {
          min: minAge ? Number.parseInt(minAge) : undefined,
          max: maxAge ? Number.parseInt(maxAge) : undefined,
        }
      }

      const animals = await this.getAnimalsForAdoption.execute(filters)
      return NextResponse.json(animals)
    } catch (error) {
      console.error("Error fetching animals:", error)
      return NextResponse.json({ error: "Failed to fetch animals" }, { status: 500 })
    }
  }

  async getAnimalById(animalId: string): Promise<NextResponse> {
    try {
      const animal = await this.getAnimalDetails.execute(animalId)

      if (!animal) {
        return NextResponse.json({ error: "Animal not found" }, { status: 404 })
      }

      return NextResponse.json(animal)
    } catch (error) {
      console.error("Error fetching animal details:", error)
      return NextResponse.json({ error: "Failed to fetch animal details" }, { status: 500 })
    }
  }
}
