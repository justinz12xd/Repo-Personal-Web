import type { Animal } from "../entities/Animal"

export interface AnimalRepository {
  findAll(): Promise<Animal[]>
  findById(id: string): Promise<Animal | null>
  findByFilters(filters: AnimalFilters): Promise<Animal[]>
  save(animal: Animal): Promise<void>
  delete(id: string): Promise<void>
}

export interface AnimalFilters {
  species?: "dog" | "cat" | "other"
  size?: "small" | "medium" | "large"
  age?: { min?: number; max?: number }
  location?: string
  adoptionStatus?: "available" | "pending" | "adopted"
}
