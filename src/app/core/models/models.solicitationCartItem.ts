export interface ISolicitationCartItem {
  _id?: string;
  activity: string;
  name: string;
  description: string;
  shortDescription: string;
  startDate: Date;
  endDate: Date;
  location: string;
  meetingPoint: string;
  price: number;
  featured: boolean;
  promotion?: string;
  images: string[];
  videos?: string[];
  totalSlots: number;
  bookedSlots: number;
  available: boolean;
  notes?: string;
  category: string;
  agent: string[];
  rating: string[];
  likes: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
