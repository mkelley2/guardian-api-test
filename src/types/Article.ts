export interface Article {
  id: string;
  sectionID: string;
  sectionName: string;
  webPublicationDate: Date;
  webTitle: string;
  webUrl: string;
  fields: Fields;
}

export interface Fields {
  trailText: string;
  wordcount: string;
  lastModified: Date;
  byline: string;

  thumbnail?: string;
}
