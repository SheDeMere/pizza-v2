import { createAsyncThunk } from "@reduxjs/toolkit";
import { TPizza, TSearchPizzaParams } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<TPizza[], TSearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params: TSearchPizzaParams) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://627bb319b54fe6ee008d303d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&title=${search}`
    );
    return data;
  }
);
