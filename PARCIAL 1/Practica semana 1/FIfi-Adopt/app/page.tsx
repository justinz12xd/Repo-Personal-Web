import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Award, ArrowRight, Play as Paw, Shield, HomeIcon } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4">
        <div className="container mx-auto text-center">

          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 mt-2">
            Dale una nueva vida a un ángel de cuatro patas
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Conectamos animales callejeros y mascotas en busca de hogar con familias amorosas. Cada adopción es una vida
            salvada y un corazón lleno de amor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/adopcion">
                <Heart className="mr-2 h-5 w-5" />
                Adoptar Ahora
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/refugios">
                Ver Refugios
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="container mx-auto mt-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/happy-dogs-and-cats-together-in-a-sunny-park-with-.jpg"
              alt="Animales felices con sus familias adoptivas"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-primary mb-2">2,847</h3>
              <p className="text-muted-foreground">Animales adoptados</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-3xl font-bold text-secondary mb-2">1,523</h3>
              <p className="text-muted-foreground">Familias felices</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-3xl font-bold text-accent mb-2">45</h3>
              <p className="text-muted-foreground">Refugios aliados</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Cómo funciona la adopción?</h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Un proceso simple y seguro para encontrar tu compañero perfecto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                  <Paw className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>1. Explora</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Navega por nuestros adorables animales disponibles para adopción. Cada uno tiene su historia y
                  personalidad única.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mx-auto mb-4">
                  <Heart className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle>2. Conecta</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Contacta al refugio o persona que cuida al animal. Te ayudaremos a conocer mejor a tu futuro
                  compañero.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mx-auto mb-4">
                  <HomeIcon className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>3. Adopta</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Completa el proceso de adopción responsable y dale a tu nuevo amigo el hogar amoroso que merece.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Animals Preview */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Animales esperando un hogar</h2>
              <p className="text-xl text-muted-foreground">Conoce algunos de nuestros amigos que buscan familia</p>
            </div>
            <Button asChild>
              <Link href="/adopcion">
                Ver todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Luna", type: "Perrita", age: "2 años", image: "happy golden retriever dog in a park" },
              { name: "Milo", type: "Gatito", age: "6 meses", image: "cute orange tabby kitten playing" },
              { name: "Rocky", type: "Perro", age: "4 años", image: "friendly mixed breed dog with collar" },
            ].map((animal, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <img
                    src={`/abstract-geometric-shapes.png?height=300&width=300&query=${animal.image}`}
                    alt={animal.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-primary">Disponible</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {animal.name}
                    <Heart className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  </CardTitle>
                  <CardDescription>
                    {animal.type} • {animal.age}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <Shield className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Tienes una mascota que necesita hogar?</h2>
          <p className="text-xl opacity-90 text-balance mb-8 max-w-2xl mx-auto">
            Si no puedes cuidar más de tu mascota, te ayudamos a encontrarle una familia amorosa que le brinde el
            cuidado que merece.
          </p>
          <Button size="lg" variant="secondary">
            Publicar Adopción
          </Button>
        </div>
      </section>
    </div>
  )
}
