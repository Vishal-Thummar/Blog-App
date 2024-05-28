import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userPosts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setUserPosts(state, action) {
      state.userPosts = action.payload;
    },
  },
});

export const { setUserPosts } = postsSlice.actions;
export default postsSlice.reducer;
