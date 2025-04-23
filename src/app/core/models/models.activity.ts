export interface ILocationCoordinates {
  type: string;
  coordinates: number[];
}

export interface IActivity {
  locationCoordinates: ILocationCoordinates;
  _id: string;
  name: string;
  description: string;
  shortDescription: string;
  startDate: string;
  endDate: string;
  location: string;
  meetingPoint: string;
  price: number;
  featured: boolean;
  images: string[];
  videos: string[];
  totalSlots: number;
  bookedSlots: number;
  available: boolean;
  notes: string;
  category: string;
  agent: any[];
  shareCount: number;
  allowedPaymentMethods: string[];
  createdAt: string;
  updatedAt: string;
  rating: any[];
  likes: any[];
  client: any[];
  groups: any[];
  averageRating: number;
}

export interface IActivityFilters {
  keyword: string;
  category: string;
  startDate: string;
  endDate: string;
  minPrice: string;
  maxPrice: string;
  language: string;
  lat: string;
  lng: string;
  sort: string;
}
