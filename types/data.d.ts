interface GenreResponse {
  id: number;
  name: string;
  hashId: string;
  parentGenreId?: number;
}

interface PublishDayResponse {
  id: number;
  day: string;
  displayDay: string;
  displayOrder: number;
}

interface ProviderResponse {
  id: number;
  hashId: string;
  name: string;
  displayName: string;
  description?: string;
  homepageUrl?: string;
  series?: [];
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

interface PersonResponse {
  id: number;
  hashId: string;
  name: string;
  description?: string;
  series?: [];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
