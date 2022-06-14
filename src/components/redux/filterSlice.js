import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  categoryId: 0,
  search: '',
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = Number(action.payload);
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setSearch(state, action) {
      state.setSearch = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setSearch } = filterSlice.actions;
export default filterSlice.reducer;
