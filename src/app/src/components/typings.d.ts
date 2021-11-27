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
}

export interface GenerateContent {
  contentText: string;
}