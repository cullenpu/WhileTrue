export interface ContentCard {
  contentTitle?: string;
  contentBody: string;
}

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