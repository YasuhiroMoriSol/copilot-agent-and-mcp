import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async ({ sortBy, order } = {}) => {
  const params = new URLSearchParams();
  if (sortBy) params.set('sortBy', sortBy);
  if (order) params.set('order', order);
  const query = params.toString() ? `?${params.toString()}` : '';
  const res = await fetch(`http://localhost:4000/api/books${query}`);
  return res.json();
});

const booksSlice = createSlice({
  name: 'books',
  initialState: { items: [], status: 'idle', sortBy: 'title', order: 'asc' },
  reducers: {
    setSort(state, action) {
      state.sortBy = action.payload.sortBy;
      state.order = action.payload.order;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, state => { state.status = 'loading'; })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, state => { state.status = 'failed'; });
  },
});

export const { setSort } = booksSlice.actions;
export default booksSlice.reducer;
