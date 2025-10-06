import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Target, Users, Heart, Megaphone, Clock, Euro } from "lucide-react"

const campaigns = [
  {
    id: 1,
    title: "Rescate de Emergencia - Colonia Felina",
    description:
      "Necesitamos fondos urgentes para rescatar y dar atención médica a 15 gatos que viven en condiciones precarias en una colonia abandonada.",
    image: "stray cats colony needing rescue help",
    goal: 3500,
    raised: 2100,
    daysLeft: 12,
    location: "Madrid",
    category: "Emergencia",
    urgent: true,
    supporters: 89,
  },
  {
    id: 2,
    title: "Construcción de Nuevo Refugio",
    description:
      "Ayúdanos a construir un refugio moderno con capacidad para 50 animales, equipado con área veterinaria y espacios de socialización.",
    image: "modern animal shelter construction site",
    goal: 25000,
    raised: 18750,
    daysLeft: 45,
    location: "Barcelona",
    category: "Infraestructura",
    urgent: false,
    supporters: 234,
  },
  {
    id: 3,
    title: "Programa de Esterilización Masiva",
    description:
      "Campaña para esterilizar 200 animales callejeros y controlar la sobrepoblación en zonas rurales de Valencia.",
    image: "veterinary sterilization program for street animals",
    goal: 8000,
    raised: 5600,
    daysLeft: 28,
    location: "Valencia",
    category: "Salud",
    urgent: false,
    supporters: 156,
  },
  {
    id: 4,
    title: "Alimentación de Invierno",
    description: "Proporcionar alimento y refugio temporal a animales callejeros durante los meses más fríos del año.",
    image: "feeding stray animals in winter shelter",
    goal: 4500,
    raised: 3200,
    daysLeft: 35,
    location: "Bilbao",
    category: "Alimentación",
    urgent: false,
    supporters: 78,
  },
  {
    id: 5,
    title: "Tratamiento Médico para Luna",
    description:
      "Luna necesita una cirugía urgente para reparar una fractura en su pata trasera. Tu ayuda puede salvar su vida.",
    image: "injured dog needing medical treatment",
    goal: 1200,
    raised: 950,
    daysLeft: 8,
    location: "Sevilla",
    category: "Médico",
    urgent: true,
    supporters: 45,
  },
  {
    id: 6,
    title: "Educación y Concienciación",
    description:
      "Programa educativo en escuelas para enseñar a los niños sobre el cuidado responsable de mascotas y la importancia de la adopción.",
    image: "children learning about animal care in school",
    goal: 6000,
    raised: 2400,
    daysLeft: 60,
    location: "Granada",
    category: "Educación",
    urgent: false,
    supporters: 67,
  },
]

const getCategoryColor = (category: string) => {
  const colors = {
    Emergencia: "bg-red-100 text-red-800",
    Infraestructura: "bg-blue-100 text-blue-800",
    Salud: "bg-green-100 text-green-800",
    Alimentación: "bg-orange-100 text-orange-800",
    Médico: "bg-purple-100 text-purple-800",
    Educación: "bg-yellow-100 text-yellow-800",
  }
  return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
}

export default function CampanasPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Campañas Activas</h1>
        <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
          Únete a nuestras campañas y ayuda a hacer la diferencia en la vida de los animales que más lo necesitan
        </p>
      </div>
      {/* Urgent Campaigns Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 w-max justify-center  mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <Megaphone className="h-6 w-6 text-red-600" />
          <h3 className="text-lg font-bold text-red-800">Campañas Urgentes</h3>
        </div>
        <p className="text-red-700 mb-4">
          Estas campañas necesitan tu ayuda inmediata. 
        </p>
        <div className="flex gap-4 overflow-x-auto">
          {campaigns
            .filter((campaign) => campaign.urgent)
            .map((campaign) => (
              <div
                key={campaign.id}
                className="flex-shrink-0 bg-white rounded-lg p-4 border border-red-200 min-w-[280px]"
              >
                <h4 className="font-semibold text-sm mb-2">{campaign.title}</h4>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>
                    €{campaign.raised} / €{campaign.goal}
                  </span>
                  <span>{campaign.daysLeft} días restantes</span>
                </div>
                <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2 mb-3" />
                <Button size="sm" className="w-full">
                  Donar Ahora
                </Button>
              </div>
            ))}
        </div>
      </div>

      {/* All Campaigns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="relative aspect-video">
              <img
                src={`/abstract-geometric-shapes.png?height=200&width=400&query=${campaign.image}`}
                alt={campaign.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                {campaign.urgent && (
                  <Badge variant="destructive" className="text-xs">
                    Urgente
                  </Badge>
                )}
                <Badge className={`text-xs ${getCategoryColor(campaign.category)}`}>{campaign.category}</Badge>
              </div>
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                {campaign.title}
              </CardTitle>
              <CardDescription className="line-clamp-3">{campaign.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{campaign.location}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">€{campaign.raised.toLocaleString()}</span>
                  <span className="text-muted-foreground">de €{campaign.goal.toLocaleString()}</span>
                </div>
                <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{Math.round((campaign.raised / campaign.goal) * 100)}% completado</span>
                  <span>{campaign.supporters} colaboradores</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{campaign.daysLeft} días restantes</span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1" size="sm">
                  Donar
                </Button>
                <Button variant="outline" size="sm">
                  Ver más
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Campaign CTA */}
      <div className="mt-16 bg-primary/5 rounded-2xl p-8 text-center">
        <Megaphone className="h-16 w-16 text-primary mx-auto mb-6" />
        <h3 className="text-2xl font-bold mb-4">¿Tienes una causa que necesita apoyo?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Si eres un refugio, protectora o persona individual que necesita ayuda para una causa animal, puedes crear tu
          propia campaña de recaudación de fondos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">Crear Campaña</Button>
          <Button size="lg" variant="outline">
            Guía para Organizadores
          </Button>
        </div>
      </div>

      {/* How it Works */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-center mb-8">¿Cómo funcionan las donaciones?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Elige tu causa</h4>
            <p className="text-muted-foreground">
              Selecciona la campaña que más te inspire y decide el monto que quieres donar.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
              <Target className="h-8 w-8 text-secondary" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Donación segura</h4>
            <p className="text-muted-foreground">
              Realiza tu donación de forma segura a través de nuestro sistema de pagos protegido.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
              <Users className="h-8 w-8 text-accent" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Seguimiento transparente</h4>
            <p className="text-muted-foreground">
              Recibe actualizaciones sobre cómo se utiliza tu donación y el impacto que genera.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
