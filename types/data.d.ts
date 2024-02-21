interface GenreResponse {
  Id: number;
  Name: string;
  HashId: string;
  ParentGenreId: number;
}

interface PublishDayResponse {
  Id: number;
  Day: string;
  DisplayDay: string;
  DisplayOrder: number;
}

interface ProviderResponse {
  Id: number;
  HashId: string;
  Name: string;
  DisplayName: string;
  Description?: string;
  HomepageUrl?: string;
  Series?: [];
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
}

interface PersonResponse {
  Id: number;
  HashId: string;
  Name: string;
  Description?: string;
  Series?: [];
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
}
