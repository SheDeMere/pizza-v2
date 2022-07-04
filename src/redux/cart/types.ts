export type TCartItem = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  type: string;
  size: number;
  count: number;
};

export interface ICartSliceState {
  totalPrice: number;
  totalCount: number;
  items: TCartItem[];
}
