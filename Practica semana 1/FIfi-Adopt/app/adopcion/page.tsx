"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Filter, Search } from "lucide-react"
import { useAnimals } from "../../src/presentation/hooks/useAnimals"
import { AnimalCard } from "../../src/presentation/components/AnimalCard"
import type { AnimalFilters } from "../../src/domain/repositories/AnimalRepository"

export default function AdopcionPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<"dog" | "cat" | "other" | "all">("all")
  const [sizeFilter, setSizeFilter] = useState<"small" | "medium" | "large" | "all">("all")
  const [locationFilter, setLocationFilter] = useState("")

  // Memoize filters to avoid creating a new object on every render,
  // which would retrigger data fetching in useAnimals and cause a loop
  const filters: AnimalFilters = useMemo(
    () => ({
      species: typeFilter === "all" ? undefined : typeFilter,
      size: sizeFilter === "all" ? undefined : sizeFilter,
      location: locationFilter || undefined,
    }),
    [typeFilter, sizeFilter, locationFilter],
  )

  const { animals, loading, error } = useAnimals(filters)

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch =
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (animal.breed && animal.breed.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSearch
  })

  const handleAdopt = (animalId: string) => {
    // TODO: Implement adoption request flow
    console.log("Adopting animal:", animalId)
  }

  const handleViewDetails = (animalId: string) => {
    // TODO: Navigate to animal details page
    console.log("Viewing details for animal:", animalId)
  }

  const handleToggleFavorite = (animalId: string) => {
    // TODO: Implement favorites functionality
    console.log("Toggling favorite for animal:", animalId)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setTypeFilter("all")
    setSizeFilter("all")
    setLocationFilter("")
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Encuentra tu compañero perfecto</h1>
        <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
          Cada animal tiene una historia única y está esperando encontrar una familia que lo ame incondicionalmente
        </p>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Filtros de búsqueda</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o raza..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as typeof typeFilter)}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de animal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="dog">Perros</SelectItem>
              <SelectItem value="cat">Gatos</SelectItem>
              <SelectItem value="other">Otros</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sizeFilter} onValueChange={(value) => setSizeFilter(value as typeof sizeFilter)}>
            <SelectTrigger>
              <SelectValue placeholder="Tamaño" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tamaños</SelectItem>
              <SelectItem value="small">Pequeño</SelectItem>
              <SelectItem value="medium">Mediano</SelectItem>
              <SelectItem value="large">Grande</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Ubicación..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />

          <Button variant="outline" onClick={clearFilters}>
            Limpiar filtros
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground">
          {loading ? "Cargando..." : `Mostrando ${filteredAnimals.length} de ${animals.length} animales disponibles`}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-t-lg" />
              <div className="bg-white p-4 rounded-b-lg">
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-3 bg-gray-200 rounded mb-4" />
                <div className="h-8 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnimals.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              onAdopt={handleAdopt}
              onViewDetails={handleViewDetails}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && filteredAnimals.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No se encontraron animales</h3>
          <p className="text-muted-foreground mb-4">
            Intenta ajustar los filtros de búsqueda para encontrar más opciones
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Limpiar todos los filtros
          </Button>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-16 bg-primary/5 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">¿No encuentras lo que buscas?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Regístrate para recibir notificaciones cuando lleguen nuevos animales que coincidan con tus preferencias
        </p>
        <Button size="lg">Crear alerta de adopción</Button>
      </div>
    </div>
  )
}
