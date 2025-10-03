"use client"

import { useState, useEffect } from "react"
import type { Shelter } from "../../domain/entities/Shelter"

export function useShelters() {
  const [shelters, setShelters] = useState<Shelter[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("/api/shelters")
        if (!response.ok) {
          throw new Error("Failed to fetch shelters")
        }

        const data = await response.json()
        setShelters(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchShelters()
  }, [])

  return { shelters, loading, error }
}
