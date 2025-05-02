export type ActivityCategory = 'Passeio' | 'Excursão' | 'Evento' | 'Outro';

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
  startDate: Date | string; // Mantido como Date | string para flexibilidade
  endDate: Date | string; // Mantido como Date | string para flexibilidade
  location: string;
  meetingPoint?: string; // Marcado como opcional
  price: number;
  featured: boolean;
  promotion?: string; // Adicionado campo opcional
  images: string[];
  videos?: string[]; // Marcado como opcional
  totalSlots: number;
  bookedSlots: number;
  available: boolean;
  notes?: string; // Marcado como opcional
  category: ActivityCategory; // Usando o enum definido
  language?: string; // Adicionado campo opcional
  agent: string[]; // Alterado de any[] para string[] (IDs)
  rating: string[]; // Alterado de any[] para string[] (IDs)
  likes: string[]; // Alterado de any[] para string[] (IDs)
  client: string[]; // Alterado de any[] para string[] (IDs)
  groups: string[]; // Alterado de any[] para string[] (IDs)
  shareCount: number;
  allowedPaymentMethods: string[];
  createdAt: Date | string; // Mantido como Date | string
  updatedAt: Date | string; // Mantido como Date | string
  averageRating?: number; // Mantido, pode ser calculado no frontend/backend
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
