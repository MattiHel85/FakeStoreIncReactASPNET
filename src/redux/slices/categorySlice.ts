import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { Category, CategoryState } from '../../types/Category'

export const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null
}

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  try {
      const res = await fetch('https://fakestoreinc.azurewebsites.net/api/v1/categorys')
      const data = await res.json()
      return data as Category[]
  } catch (err) {
      throw err;
  }
})

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchCategories.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
          })
          .addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'An error occurred.';
          })
      },
      
})

export default categorySlice.reducer