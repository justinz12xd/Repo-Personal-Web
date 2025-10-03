export interface Shelter {
  id: string
  name: string
  description: string
  address: string
  phone: string
  email: string
  website?: string
  capacity: number
  currentAnimals: number
  specialties: string[]
  isVerified: boolean
  rating: number
  images: string[]
  operatingHours: OperatingHours
  createdAt: Date
  updatedAt: Date
}

export interface OperatingHours {
  monday: TimeSlot
  tuesday: TimeSlot
  wednesday: TimeSlot
  thursday: TimeSlot
  friday: TimeSlot
  saturday: TimeSlot
  sunday: TimeSlot
}

export interface TimeSlot {
  open: string
  close: string
  isClosed: boolean
}

export class ShelterEntity implements Shelter {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public address: string,
    public phone: string,
    public email: string,
    public capacity: number,
    public currentAnimals: number,
    public specialties: string[],
    public isVerified: boolean,
    public rating: number,
    public images: string[],
    public operatingHours: OperatingHours,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public website?: string,
  ) {}

  hasCapacity(): boolean {
    return this.currentAnimals < this.capacity
  }

  getOccupancyRate(): number {
    return (this.currentAnimals / this.capacity) * 100
  }

  addAnimal(): void {
    if (this.hasCapacity()) {
      this.currentAnimals++
      this.updatedAt = new Date()
    } else {
      throw new Error("Shelter is at full capacity")
    }
  }

  removeAnimal(): void {
    if (this.currentAnimals > 0) {
      this.currentAnimals--
      this.updatedAt = new Date()
    }
  }
}
