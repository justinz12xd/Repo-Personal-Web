export interface Campaign {
  id: string
  title: string
  description: string
  goalAmount: number
  currentAmount: number
  category: CampaignCategory
  urgencyLevel: "low" | "medium" | "high" | "critical"
  targetAnimal?: string // Animal ID if campaign is for specific animal
  shelterId: string
  images: string[]
  startDate: Date
  endDate: Date
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export type CampaignCategory =
  | "medical_treatment"
  | "food_supplies"
  | "shelter_maintenance"
  | "rescue_operation"
  | "vaccination_drive"
  | "emergency_care"

export class CampaignEntity implements Campaign {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public goalAmount: number,
    public currentAmount: number,
    public category: CampaignCategory,
    public urgencyLevel: "low" | "medium" | "high" | "critical",
    public shelterId: string,
    public images: string[],
    public startDate: Date,
    public endDate: Date,
    public isActive = true,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public targetAnimal?: string,
  ) {}

  getProgressPercentage(): number {
    return Math.min((this.currentAmount / this.goalAmount) * 100, 100)
  }

  getRemainingAmount(): number {
    return Math.max(this.goalAmount - this.currentAmount, 0)
  }

  isGoalReached(): boolean {
    return this.currentAmount >= this.goalAmount
  }

  addDonation(amount: number): void {
    this.currentAmount += amount
    this.updatedAt = new Date()
  }

  isExpired(): boolean {
    return new Date() > this.endDate
  }

  deactivate(): void {
    this.isActive = false
    this.updatedAt = new Date()
  }
}
