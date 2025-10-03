"use client"

import { useState, useEffect } from "react"
import type { Animal } from "../../domain/entities/Animal"
import type { AnimalFilters } from "../../domain/repositories/AnimalRepository"

export function useAnimals(filters?: AnimalFilters) {
  const [animals, setAnimals] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoading(true)
        setError(null)

        const queryParams = new URLSearchParams()
        if (filters?.species) queryParams.set("species", filters.species)
        if (filters?.size) queryParams.set("size", filters.size)
        if (filters?.location) queryParams.set("location", filters.location)
        if (filters?.age?.min) queryParams.set("minAge", filters.age.min.toString())
        if (filters?.age?.max) queryParams.set("maxAge", filters.age.max.toString())

        const response = await fetch(`/api/animals?${queryParams.toString()}`)
        if (!response.ok) {
          throw new Error("Failed to fetch animals")
        }

        const data = await response.json()
        setAnimals(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchAnimals()
    // Depend on filter values instead of object identity to prevent infinite loops
  }, [
    filters?.species,
    filters?.size,
    filters?.location,
    filters?.age?.min,
    filters?.age?.max,
  ])

  return { animals, loading, error }
}
