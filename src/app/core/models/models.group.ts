import { IActivity } from "./models.activity";
import { IClient } from "./models.client";

export interface IGroup {
  _id: string;
  name: string;
  members: IClient[];
  activity: IActivity[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
