export type ActivityCategory = 'Passeio' | 'Excursão' | 'Evento' | 'Outro';

export interface IActivity {
  _id?: string;
  name: string;
  description: string;
  shortDescription: string;
  startDate: Date;
  endDate: Date;
  location: string;
  meetingPoint?: string;
  price: number;
  featured: boolean;
  promotion?: string;
  images: string[];
  videos?: string[];
  totalSlots: number;
  bookedSlots: number;
  available: boolean;
  notes?: string;
  category: ActivityCategory;
  language?: string;
  agent: string[]; // IDs do Agent
  rating: string[]; // IDs do Rating
  likes: string[];  // IDs do Client
  client: string[]; // IDs do Client
  shareCount: number;
  groups: string[]; // IDs do Group
  allowedPaymentMethods: string[];
  locationCoordinates: {
    type: 'Point';
    coordinates: number[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}
