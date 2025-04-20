export type ContentPageStatus = 'published' | 'draft' | 'archived';

export interface IContentPage {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  status: ContentPageStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
