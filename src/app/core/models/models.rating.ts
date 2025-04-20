export interface IRating {
  _id?: string;
  name: string;
  text: string;
  score: number;
  activity: string; // ID de Activity
  client: string;   // ID de Client
  createdAt?: Date;
  updatedAt?: Date;
}
