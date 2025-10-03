import type { Shelter } from "../entities/Shelter"

export interface ShelterRepository {
  findAll(): Promise<Shelter[]>
  findById(id: string): Promise<Shelter | null>
  findByLocation(location: string): Promise<Shelter[]>
  save(shelter: Shelter): Promise<void>
  delete(id: string): Promise<void>
}
