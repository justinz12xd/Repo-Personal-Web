export interface AdoptionRequest {
  id: string
  animalId: string
  applicantName: string
  applicantEmail: string
  applicantPhone: string
  applicantAddress: string
  hasExperience: boolean
  hasOtherPets: boolean
  livingSpace: "apartment" | "house_small_yard" | "house_large_yard" | "farm"
  reasonForAdoption: string
  status: AdoptionStatus
  submittedAt: Date
  reviewedAt?: Date
  reviewNotes?: string
}

export type AdoptionStatus = "pending" | "under_review" | "approved" | "rejected" | "completed"

export class AdoptionRequestEntity implements AdoptionRequest {
  constructor(
    public id: string,
    public animalId: string,
    public applicantName: string,
    public applicantEmail: string,
    public applicantPhone: string,
    public applicantAddress: string,
    public hasExperience: boolean,
    public hasOtherPets: boolean,
    public livingSpace: "apartment" | "house_small_yard" | "house_large_yard" | "farm",
    public reasonForAdoption: string,
    public status: AdoptionStatus = "pending",
    public submittedAt: Date = new Date(),
    public reviewedAt?: Date,
    public reviewNotes?: string,
  ) {}

  approve(notes?: string): void {
    this.status = "approved"
    this.reviewedAt = new Date()
    this.reviewNotes = notes
  }

  reject(notes: string): void {
    this.status = "rejected"
    this.reviewedAt = new Date()
    this.reviewNotes = notes
  }

  markAsCompleted(): void {
    this.status = "completed"
  }

  isPending(): boolean {
    return this.status === "pending" || this.status === "under_review"
  }
}
