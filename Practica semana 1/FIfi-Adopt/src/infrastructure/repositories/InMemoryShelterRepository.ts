import type { Shelter } from "../../domain/entities/Shelter"
import type { ShelterRepository } from "../../domain/repositories/ShelterRepository"
import { ShelterEntity } from "../../domain/entities/Shelter"

export class InMemoryShelterRepository implements ShelterRepository {
  private shelters: Shelter[] = [
    new ShelterEntity(
      "1",
      "Refugio Esperanza",
      "Refugio dedicado al cuidado y rehabilitación de perros abandonados. Contamos con instalaciones modernas y un equipo veterinario especializado.",
      "Calle de la Esperanza 123, 28001 Madrid",
      "+34 91 123 4567",
      "info@refugioesperanza.org",
      50,
      32,
      ["Perros", "Rehabilitación", "Cuidados médicos"],
      true,
      4.8,
      ["/modern-animal-shelter-with-dogs.jpg"],
      {
        monday: { open: "09:00", close: "18:00", isClosed: false },
        tuesday: { open: "09:00", close: "18:00", isClosed: false },
        wednesday: { open: "09:00", close: "18:00", isClosed: false },
        thursday: { open: "09:00", close: "18:00", isClosed: false },
        friday: { open: "09:00", close: "18:00", isClosed: false },
        saturday: { open: "10:00", close: "16:00", isClosed: false },
        sunday: { open: "10:00", close: "14:00", isClosed: false },
      },
      new Date("2020-03-15"),
      new Date("2024-01-15"),
      "https://refugioesperanza.org",
    ),
    new ShelterEntity(
      "2",
      "Protectora Felina Barcelona",
      "Especialistas en el cuidado de gatos callejeros y abandonados. Promovemos la adopción responsable y el control de colonias felinas.",
      "Avenida Diagonal 456, 08013 Barcelona",
      "+34 93 987 6543",
      "contacto@protectorafelina.cat",
      30,
      18,
      ["Gatos", "Colonias felinas", "Esterilización"],
      true,
      4.6,
      ["/cat-shelter-with-multiple-cats.jpg"],
      {
        monday: { open: "10:00", close: "19:00", isClosed: false },
        tuesday: { open: "10:00", close: "19:00", isClosed: false },
        wednesday: { open: "10:00", close: "19:00", isClosed: false },
        thursday: { open: "10:00", close: "19:00", isClosed: false },
        friday: { open: "10:00", close: "19:00", isClosed: false },
        saturday: { open: "11:00", close: "17:00", isClosed: false },
        sunday: { open: "00:00", close: "00:00", isClosed: true },
      },
      new Date("2018-07-22"),
      new Date("2024-02-01"),
      "https://protectorafelina.cat",
    ),
    new ShelterEntity(
      "3",
      "Asociación Patitas Valencia",
      "Organización sin ánimo de lucro dedicada al rescate y adopción de animales abandonados. Trabajamos con voluntarios apasionados por el bienestar animal.",
      "Calle Mayor 789, 46001 Valencia",
      "+34 96 321 9876",
      "info@patitasvalencia.org",
      40,
      25,
      ["Perros", "Gatos", "Animales exóticos"],
      false,
      4.2,
      ["/animal-rescue-center-with-volunteers.jpg"],
      {
        monday: { open: "08:30", close: "17:30", isClosed: false },
        tuesday: { open: "08:30", close: "17:30", isClosed: false },
        wednesday: { open: "08:30", close: "17:30", isClosed: false },
        thursday: { open: "08:30", close: "17:30", isClosed: false },
        friday: { open: "08:30", close: "17:30", isClosed: false },
        saturday: { open: "09:00", close: "15:00", isClosed: false },
        sunday: { open: "09:00", close: "13:00", isClosed: false },
      },
      new Date("2019-11-10"),
      new Date("2024-01-28"),
      "https://patitasvalencia.org",
    ),
  ]

  async findAll(): Promise<Shelter[]> {
    return [...this.shelters]
  }

  async findById(id: string): Promise<Shelter | null> {
    const shelter = this.shelters.find((s) => s.id === id)
    return shelter || null
  }

  async findByLocation(location: string): Promise<Shelter[]> {
    return this.shelters.filter((shelter) => shelter.address.toLowerCase().includes(location.toLowerCase()))
  }

  async save(shelter: Shelter): Promise<void> {
    const index = this.shelters.findIndex((s) => s.id === shelter.id)
    if (index >= 0) {
      this.shelters[index] = shelter
    } else {
      this.shelters.push(shelter)
    }
  }

  async delete(id: string): Promise<void> {
    this.shelters = this.shelters.filter((s) => s.id !== id)
  }
}
