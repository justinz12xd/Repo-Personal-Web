export interface Animal {
  id: string
  name: string
  species: "dog" | "cat" | "other"
  breed?: string
  age: number
  gender: "male" | "female"
  size: "small" | "medium" | "large"
  description: string
  healthStatus: "healthy" | "needs_treatment" | "special_needs"
  isVaccinated: boolean
  isNeutered: boolean
  images: string[]
  location: string
  contactInfo: ContactInfo
  adoptionStatus: "available" | "pending" | "adopted"
  createdAt: Date
  updatedAt: Date
}

export interface ContactInfo {
  shelterName?: string
  contactPerson: string
  phone: string
  email: string
  address: string
}

export class AnimalEntity implements Animal {
  constructor(
    public id: string,
    public name: string,
    public species: "dog" | "cat" | "other",
    public age: number,
    public gender: "male" | "female",
    public size: "small" | "medium" | "large",
    public description: string,
    public healthStatus: "healthy" | "needs_treatment" | "special_needs",
    public isVaccinated: boolean,
    public isNeutered: boolean,
    public images: string[],
    public location: string,
    public contactInfo: ContactInfo,
    public adoptionStatus: "available" | "pending" | "adopted" = "available",
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public breed?: string,
  ) {}

  isAvailableForAdoption(): boolean {
    return this.adoptionStatus === "available"
  }

  markAsPending(): void {
    this.adoptionStatus = "pending"
    this.updatedAt = new Date()
  }

  markAsAdopted(): void {
    this.adoptionStatus = "adopted"
    this.updatedAt = new Date()
  }

  updateHealthStatus(status: "healthy" | "needs_treatment" | "special_needs"): void {
    this.healthStatus = status
    this.updatedAt = new Date()
  }
}
