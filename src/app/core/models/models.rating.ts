export interface IRating {
  _id?: string;
  name: string;
  text: string;
  score: number;
  activity: string; 
  client: string;
  createdAt?: Date;
  updatedAt?: Date;
}
