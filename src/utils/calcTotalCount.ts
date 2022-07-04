import { TCartItem } from "../redux/cart/types";

export const calcTotalCount = (items: TCartItem[]) => {
  return items.reduce((sum, obj) => sum + obj.count, 0);
};
