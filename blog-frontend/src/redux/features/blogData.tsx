import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state interface
interface BlogState {
  blogData: any;
}

// Define the initial state
const initialState: BlogState = {
  blogData: {},
};


const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
      addBlogData(state, action: PayloadAction<any>) {
        state.blogData = action.payload;
      },
    },
  });

// Export actions and reducer
export const { addBlogData } = blogSlice.actions;
export default blogSlice.reducer;
