import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    subcategories: [],
}

const subCategorySlice = createSlice({
  name: 'subCategories',
  initialState,
  reducers: {
    getSubCategories(state, action) {
        state.subcategories = action.payload
        return state
    }
  },
})

export const { getSubCategories } = subCategorySlice.actions
export default subCategorySlice.reducer