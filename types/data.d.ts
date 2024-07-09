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
  link: string;
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
  personType?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

interface PublisherResponse {
  id: number;
  hashId: string;
  name: string;
  description?: string;
  homepageUrl?: string;
  series?: SeriesResponse[];
}

interface SeriesResponse {
  id: number;
  hashId: string;
  title: string;
  description?: string;
  isbn?: string;
  ecn?: string;
  seriesType: "webnovel" | "webtoon";
  genres?: GenreResponse[];
  publishDays?: PublishDayResponse[];
  authors?: PersonResponse[];
  providers?: ProviderResponse[];
  publisher?: PublisherResponse;
  publishers?: PublisherResponse[];
  episodes?: EpisodeResponse[];
  isComplete: boolean;
}

interface EpiosdeResponse {
  id: number;
  title: string;
  episodeNumber: number;
  thumbnail: string;
  series?: SeriesResponse[];
}

interface PublisherResponse {
  id: number;
  hashId: string;
  name: string;
  description?: string;
  homepageUrl?: string;
  series?: SeriesResponse[];
}

interface EpisodeResponse {
  id: number;
  title?: string;
  episodeNumber: number;
  thumbnail?: string;
  series?: SeriesResponse[];
}
