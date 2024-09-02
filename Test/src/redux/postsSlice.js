import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return response.json();
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    allPosts: [],
    currentPosts: [],
    currentPage: 1,
    totalPages: 0,
    loading: true,
  },
  reducers: {
    removePost: (state, action) => {
      state.currentPosts = state.currentPosts.filter(post => post.id !== action.payload);
      const nextPostIndex = state.allPosts.length > state.currentPosts.length
        ? state.currentPage * 6 + state.currentPosts.length
        : -1;
      if (nextPostIndex >= 0) {
        state.currentPosts.push(state.allPosts[nextPostIndex]);
      }
    },
    goToPage: (state, action) => {
      const pageNumber = action.payload;
      state.currentPage = pageNumber;
      const start = (pageNumber - 1) * 6;
      const end = start + 6;
      state.currentPosts = state.allPosts.slice(start, end);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.allPosts = action.payload;
        state.totalPages = Math.ceil(action.payload.length / 6);
        state.currentPosts = action.payload.slice(0, 6);
      });
  },
});

export const { removePost, goToPage } = postsSlice.actions;

export default postsSlice.reducer;
