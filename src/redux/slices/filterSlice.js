import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: {
    subCategoryId: "",
    brands: [],
    filters: {},
    sort: "",
    search: "",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSubCategoryId: (state, action) => {
      state.filter.subCategoryId = action.payload;
    },
    setBrands: (state, action) => {
      state.filter.brands = action.payload;
    },
    setFilters: (state, action) => {
      state.filter.filters = action.payload;
    },
    setSort: (state, action) => {
      state.filter.sort = action.payload;
    },
    setSearch: (state, action) => {
      state.filter.search = action.payload;
    },
  },
});

export const { setSubCategoryId, setFilters, setSearch, setBrands, setSort } =
  filterSlice.actions;
export default filterSlice.reducer;
