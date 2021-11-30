export interface ContentCard {
  contentTitle: string;
  contentBody: string;
}

export interface MainButtonAttr {
  buttonText: string;
  hrefText?: string;
  onClickHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface GenerateSearchBar {
  barText: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
