export interface ContentType {
  contentTitle: string;
  contentText: string;
}

export interface MainButtonAttr {
  buttonText: string;
  hrefText?: string;
  onClickHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface GenerateSearch {
  barText: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface GenerateContent {
  contentText: string;
}