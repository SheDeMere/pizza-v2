export enum ESortProperty {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}

export type TSort = {
  name: string;
  sortProperty: ESortProperty;
};

export interface IFilterSliceState {
  categoryId: number;
  searchValue: string;
  currentPage: number;
  sort: TSort;
}
