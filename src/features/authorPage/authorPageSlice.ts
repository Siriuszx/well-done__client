import { z } from 'zod';
import { useAppFetch } from '@/lib/useAppFetch';

import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';
import { AuthorData, AuthorDataSchema } from '@/types/itemData/AuthorData';
import { PostData, PostDataSchema } from '@/types/itemData/PostData';

type AuthorPageState = {
  authorData: AuthorData | null;
  authorPosts: PostData[];
  fetchAuthorState: { isLoading: boolean; error: SerializedError | null };
  fetchAuthorPostsState: { isLoading: boolean; error: SerializedError | null };
};

const initialState: AuthorPageState = {
  authorData: null,
  authorPosts: [],
  fetchAuthorState: { isLoading: true, error: null },
  fetchAuthorPostsState: { isLoading: true, error: null },
};

export const fetchAuthor = createAsyncThunk(
  'authorPage/fetchAuthor',
  async (authorId: string, { rejectWithValue }) => {
    const { data, responseState } = await useAppFetch(`/api/authors/${authorId}`, {
      method: 'GET',
      mode: 'cors',
    });

    if (!responseState.ok) return rejectWithValue(data);

    const validationResult = AuthorDataSchema.safeParse(data);

    if (!validationResult.success) return rejectWithValue(data);

    return validationResult.data;
  }
);

export const fetchAuthorPosts = createAsyncThunk(
  'authorPage/fetchAuthorPosts',
  async (userId: string, { rejectWithValue }) => {
    const { data, responseState } = await useAppFetch(`/api/posts?userid=${userId}`, {
      method: 'GET',
      mode: 'cors',
    });

    if (!responseState.ok) return rejectWithValue(data);

    const validationResult = z.array(PostDataSchema).safeParse(data);

    if (!validationResult.success) return rejectWithValue(data);

    return validationResult.data;
  }
);

const authorPageSlice = createSlice({
  name: 'authorPage',
  initialState,
  reducers: {
    resetState(state) {
      state.authorData = null;
      state.authorPosts = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuthor.pending, (state) => {
        state.fetchAuthorState.isLoading = true;
        state.fetchAuthorState.error = null;
      })
      .addCase(fetchAuthor.fulfilled, (state, action) => {
        state.authorData = action.payload;
        state.fetchAuthorState.isLoading = false;
      })
      .addCase(fetchAuthor.rejected, (state, action) => {
        state.fetchAuthorState.isLoading = false;
        state.fetchAuthorState.error = action.error;
      });
    builder
      .addCase(fetchAuthorPosts.pending, (state) => {
        state.fetchAuthorPostsState.isLoading = true;
        state.fetchAuthorPostsState.error = null;
      })
      .addCase(fetchAuthorPosts.fulfilled, (state, action) => {
        state.authorPosts = action.payload;
        state.fetchAuthorPostsState.isLoading = false;
      })
      .addCase(fetchAuthorPosts.rejected, (state, action) => {
        state.fetchAuthorPostsState.isLoading = false;
        state.fetchAuthorPostsState.error = action.error;
      });
  },
});

export const { resetState } = authorPageSlice.actions;

export default authorPageSlice.reducer;

export const selectAuthorData = (state: RootState) => state.authorPage.authorData;

export const selectAuthorPosts = (state: RootState) => state.authorPage.authorPosts;

export const selectFetchAuthorState = (state: RootState) =>
  state.authorPage.fetchAuthorState;

export const selectFetchAuthorPostsState = (state: RootState) =>
  state.authorPage.fetchAuthorPostsState;
