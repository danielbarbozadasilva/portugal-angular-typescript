// Interface baseada no schema backend models.rating.ts
export interface IRating {
  _id?: string;
  name: string;
  text: string;
  score: number;
  activity: string; // Activity ID
  client: string; // Client ID
  createdAt?: Date;
  updatedAt?: Date;
}
