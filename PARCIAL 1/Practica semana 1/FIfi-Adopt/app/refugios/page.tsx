import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Globe, Star, Users, Heart, Clock, Award } from "lucide-react"

const refugios = [
  {
    id: 1,
    name: "Refugio Esperanza Animal",
    description:
      "Refugio sin ánimo de lucro dedicado al rescate y rehabilitación de animales abandonados desde hace más de 15 años.",
    image: "modern animal shelter with happy dogs and cats",
    location: "Madrid",
    address: "Calle de la Esperanza, 123, 28001 Madrid",
    phone: "+34 91 123 4567",
    email: "info@esperanzaanimal.org",
    website: "www.esperanzaanimal.org",
    capacity: 80,
    currentAnimals: 65,
    rating: 4.8,
    reviews: 156,
    established: 2008,
    specialties: ["Perros", "Gatos", "Rehabilitación"],
    verified: true,
    volunteer: true,
  },
  {
    id: 2,
    name: "Protectora Amigos Peludos",
    description:
      "Organización dedicada especialmente al cuidado de gatos callejeros y la promoción de la esterilización responsable.",
    image: "cat sanctuary with multiple cats in comfortable environment",
    location: "Barcelona",
    address: "Avinguda dels Gats, 45, 08002 Barcelona",
    phone: "+34 93 987 6543",
    email: "contacto@amigospeludos.cat",
    website: "www.amigospeludos.cat",
    capacity: 50,
    currentAnimals: 42,
    rating: 4.6,
    reviews: 89,
    established: 2012,
    specialties: ["Gatos", "Esterilización", "Colonias felinas"],
    verified: true,
    volunteer: true,
  },
  {
    id: 3,
    name: "Santuario Vida Nueva",
    description:
      "Santuario especializado en animales con necesidades especiales y casos de maltrato que requieren cuidados intensivos.",
    image: "animal sanctuary with disabled and rescued animals",
    location: "Valencia",
    address: "Camino del Santuario, 78, 46001 Valencia",
    phone: "+34 96 555 7890",
    email: "ayuda@vidanueva.org",
    website: "www.santuariovidanueva.org",
    capacity: 120,
    currentAnimals: 95,
    rating: 4.9,
    reviews: 203,
    established: 2005,
    specialties: ["Necesidades especiales", "Rehabilitación", "Terapia"],
    verified: true,
    volunteer: true,
  },
  {
    id: 4,
    name: "Refugio Corazón Canino",
    description:
      "Refugio especializado en perros de razas grandes y medianas, con amplios espacios para ejercicio y socialización.",
    image: "large dog shelter with spacious yards and play areas",
    location: "Sevilla",
    address: "Polígono Industrial Sur, Nave 12, 41001 Sevilla",
    phone: "+34 95 444 3210",
    email: "info@corazoncanino.es",
    website: "www.corazoncanino.es",
    capacity: 60,
    currentAnimals: 48,
    rating: 4.7,
    reviews: 124,
    established: 2010,
    specialties: ["Perros grandes", "Entrenamiento", "Socialización"],
    verified: true,
    volunteer: false,
  },
  {
    id: 5,
    name: "Hogar Temporal Bilbao",
    description:
      "Red de familias de acogida que proporcionan cuidado temporal a animales mientras encuentran su hogar definitivo.",
    image: "foster home network with families caring for animals",
    location: "Bilbao",
    address: "Plaza de la Acogida, 9, 48001 Bilbao",
    phone: "+34 94 666 5432",
    email: "acogida@hogartemporal.eus",
    website: "www.hogartemporalbilbao.eus",
    capacity: 40,
    currentAnimals: 35,
    rating: 4.5,
    reviews: 67,
    established: 2015,
    specialties: ["Acogida temporal", "Cachorros", "Socialización"],
    verified: true,
    volunteer: true,
  },
  {
    id: 6,
    name: "Refugio Montaña Verde",
    description: "Refugio rural ubicado en un entorno natural, ideal para la recuperación de animales traumatizados.",
    image: "rural mountain animal shelter surrounded by nature",
    location: "Granada",
    address: "Sierra Nevada, Km 15, 18001 Granada",
    phone: "+34 95 888 9012",
    email: "contacto@montanaverde.org",
    website: "www.refugiomontanaverde.org",
    capacity: 70,
    currentAnimals: 52,
    rating: 4.8,
    reviews: 91,
    established: 2007,
    specialties: ["Terapia natural", "Animales traumatizados", "Entorno rural"],
    verified: true,
    volunteer: true,
  },
]

export default function RefugiosPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Refugios Afiliados</h1>
        <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
          Conoce a nuestros refugios y protectoras aliadas que trabajan incansablemente para dar una segunda oportunidad
          a los animales
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card className="text-center">
          <CardHeader className="pb-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-2">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">45</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <CardDescription>Refugios afiliados</CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-full mx-auto mb-2">
              <Users className="h-6 w-6 text-secondary" />
            </div>
            <CardTitle className="text-2xl">2,847</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <CardDescription>Animales cuidados</CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mx-auto mb-2">
              <Award className="h-6 w-6 text-accent" />
            </div>
            <CardTitle className="text-2xl">4.7</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <CardDescription>Calificación promedio</CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl">24/7</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <CardDescription>Cuidado continuo</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Refugios Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {refugios.map((refugio) => (
          <Card key={refugio.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-video">
              <img
                src={`/abstract-geometric-shapes.png?height=250&width=500&query=${refugio.image}`}
                alt={refugio.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                {refugio.verified && (
                  <Badge className="bg-green-500 hover:bg-green-600">
                    <Award className="h-3 w-3 mr-1" />
                    Verificado
                  </Badge>
                )}
                {refugio.volunteer && (
                  <Badge variant="secondary">
                    <Users className="h-3 w-3 mr-1" />
                    Voluntarios
                  </Badge>
                )}
              </div>
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1 bg-white/90 rounded-full px-2 py-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{refugio.rating}</span>
                  <span className="text-muted-foreground">({refugio.reviews})</span>
                </div>
              </div>
            </div>

            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{refugio.name}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2 mb-3">{refugio.description}</CardDescription>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="h-4 w-4" />
                <span>{refugio.location}</span>
                <span className="text-xs">•</span>
                <span>Desde {refugio.established}</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {refugio.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Capacidad:</span>
                  <div className="font-medium">{refugio.capacity} animales</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Actualmente:</span>
                  <div className="font-medium">{refugio.currentAnimals} animales</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{refugio.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{refugio.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{refugio.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{refugio.website}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1" size="sm">
                  Ver Animales
                </Button>
                <Button variant="outline" size="sm">
                  Contactar
                </Button>
                <Button variant="outline" size="sm">
                  Donar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Become Partner CTA */}
      <div className="bg-primary/5 rounded-2xl p-8 text-center mb-12">
        <Heart className="h-16 w-16 text-primary mx-auto mb-6" />
        <h3 className="text-2xl font-bold mb-4">¿Eres un refugio o protectora?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Únete a nuestra red de refugios afiliados y amplifica tu alcance para encontrar hogares para más animales.
          Ofrecemos herramientas gratuitas para gestionar adopciones y campañas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">Solicitar Afiliación</Button>
          <Button size="lg" variant="outline">
            Información para Refugios
          </Button>
        </div>
      </div>

      {/* How to Help */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-8">¿Cómo puedes ayudar a los refugios?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Adopta</h4>
            <p className="text-muted-foreground">
              La adopción es la mejor forma de ayudar. Dale un hogar permanente a un animal necesitado.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
              <Users className="h-8 w-8 text-secondary" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Voluntariado</h4>
            <p className="text-muted-foreground">
              Dedica tu tiempo ayudando en las tareas diarias del refugio: paseos, limpieza, socialización.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
              <Award className="h-8 w-8 text-accent" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Dona</h4>
            <p className="text-muted-foreground">
              Las donaciones ayudan a cubrir gastos veterinarios, alimentación y mantenimiento de las instalaciones.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
