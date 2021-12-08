export interface ContentCard {
  seed?: string;
  contentBody: string;
  time: DateTime;
  offerId: number;
  clientSegmentId: number;
  enableSaving: boolean;
  offer?: string;
  clientSegment?: string;
}

// export interface ContentDate {
//   contentBody: string;
//   time: DateTime;
// }

export interface MainButtonAttr {
  buttonText: string;
  onClickHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface GenerateSearchBar {
  placeholder: string;
  setDataId: (data: number) => void;
  model: string;
  searchFunc: (model: string, searchTerm: string) => any;
}

export interface Offer {
  id: number;
  type: string;
  offer: string;
  userId: string;
}
