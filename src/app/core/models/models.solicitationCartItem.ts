export interface ISolicitationCartItem {
  _id?: string
  activity: string
  name: string
  description: string
  shortDescription: string
  startDate: Date | string
  endDate: Date | string
  location: string
  meetingPoint: string
  price: number
  featured: boolean
  promotion?: string
  images: string[]
  videos?: string[]
  totalSlots: number
  bookedSlots: number
  available: boolean
  notes?: string
  category: string
  agent: string[]
  rating: string[]
  likes: string[]
  createdAt?: Date
  updatedAt?: Date
}
