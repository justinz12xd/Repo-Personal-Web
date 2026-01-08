"use client"

import { useState, useEffect } from "react"
import type { Campaign } from "../../domain/entities/Campaign"

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("/api/campaigns")
        if (!response.ok) {
          throw new Error("Failed to fetch campaigns")
        }

        const data = await response.json()
        setCampaigns(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  return { campaigns, loading, error }
}
