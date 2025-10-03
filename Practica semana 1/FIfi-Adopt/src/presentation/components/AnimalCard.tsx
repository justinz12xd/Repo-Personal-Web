"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin } from "lucide-react"
import type { Animal } from "../../domain/entities/Animal"

interface AnimalCardProps {
  animal: Animal
  onAdopt?: (animalId: string) => void
  onViewDetails?: (animalId: string) => void
  onToggleFavorite?: (animalId: string) => void
}

export function AnimalCard({ animal, onAdopt, onViewDetails, onToggleFavorite }: AnimalCardProps) {
  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500"
      case "needs_treatment":
        return "bg-yellow-500"
      case "special_needs":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSpeciesLabel = (species: string) => {
    switch (species) {
      case "dog":
        return "Perro"
      case "cat":
        return "Gato"
      default:
        return "Otro"
    }
  }

  const getSizeLabel = (size: string) => {
    switch (size) {
      case "small":
        return "Pequeño"
      case "medium":
        return "Mediano"
      case "large":
        return "Grande"
      default:
        return size
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative aspect-square">
        <img
          src={animal.images[0] || "/placeholder.svg?height=300&width=300"}
          alt={animal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {animal.healthStatus === "special_needs" && (
            <Badge variant="destructive" className="text-xs">
              Necesidades especiales
            </Badge>
          )}
          <Badge variant="secondary" className="text-xs">
            {getSpeciesLabel(animal.species)}
          </Badge>
        </div>
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-3 right-3 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onToggleFavorite?.(animal.id)}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{animal.name}</CardTitle>
            <CardDescription className="text-sm">
              {animal.breed} • {animal.age} años • {animal.gender === "male" ? "Macho" : "Hembra"}
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs">
            {getSizeLabel(animal.size)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{animal.description}</p>

        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{animal.location}</span>
        </div>

        <div className="flex items-center gap-4 mb-4 text-xs">
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${animal.isVaccinated ? "bg-green-500" : "bg-red-500"}`} />
            <span>Vacunado</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${animal.isNeutered ? "bg-green-500" : "bg-red-500"}`} />
            <span>Esterilizado</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${getHealthStatusColor(animal.healthStatus)}`} />
            <span>Salud</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1" size="sm" onClick={() => onAdopt?.(animal.id)}>
            Adoptar
          </Button>
          <Button variant="outline" size="sm" onClick={() => onViewDetails?.(animal.id)}>
            Ver más
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
