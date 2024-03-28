import { useAppFetch } from '@/lib/useAppFetch';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { updateImageId } from '../profile/profileSlice';

import storage from '@/lib/storage';

import { RootState } from '@/app/store';
import { TProfileDataEditSchema } from '@/types/formSchemas/ProfileDataEditSchema';
import { TProfilePasswordEditSchema } from '@/types/formSchemas/ProfilePasswordEditSchema';
import {
  PutProfileData,
  PutProfileDataSchema,
} from '@/types/fetchResponse/success/PutProfileEdit';
import { ErrorData } from '@/types/fetchResponse/error/ErrorData';
import {
  TargetObjectId,
  TargetObjectIdSchema,
} from '@/types/fetchResponse/success/TargetObjectId';

type ProfileEditState = {
  putPersonalDetailsState: { isLoading: boolean; error: ErrorData | null };
  putPasswordState: { isLoading: boolean; error: ErrorData | null };
  putProfileImageState: { isLoading: boolean; error: ErrorData | null };
};

const initialState: ProfileEditState = {
  putPersonalDetailsState: { isLoading: false, error: null },
  putPasswordState: { isLoading: false, error: null },
  putProfileImageState: { isLoading: false, error: null },
};

export const putPersonalDetails = createAsyncThunk<
  PutProfileData,
  TProfileDataEditSchema,
  { rejectValue: ErrorData }
>('profile/putPersonalDetails', async (profileData, { rejectWithValue }) => {
  const token = storage.getToken();

  const { data, responseState } = await useAppFetch('/api/profile', {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = PutProfileDataSchema.safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as PutProfileData;
});

export const putPassword = createAsyncThunk<
  PutProfileData,
  TProfilePasswordEditSchema,
  { rejectValue: ErrorData }
>('profile/putPassword', async (passwordData, { rejectWithValue }) => {
  const token = storage.getToken();

  const { data, responseState } = await useAppFetch('/api/profile/password', {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(passwordData),
  });

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = PutProfileDataSchema.safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  return data as PutProfileData;
});

export const putProfileImage = createAsyncThunk<
  TargetObjectId,
  File,
  { rejectValue: ErrorData }
>('profile/putProfileImage', async (image, { rejectWithValue, dispatch }) => {
  const token = storage.getToken();

  const formData = new FormData();
  formData.append('image', image);

  const { data, responseState } = await useAppFetch('/api/profile/image', {
    method: 'PUT',
    mode: 'cors',
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!responseState.ok) throw rejectWithValue(data as ErrorData);

  const validationResult = TargetObjectIdSchema.safeParse(data);
  if (!validationResult.success) console.error(validationResult);

  dispatch(updateImageId((data as TargetObjectId)._id));

  return data as TargetObjectId;
});

const profileEditSlice = createSlice({
  name: 'profileEdit',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(putPersonalDetails.pending, (state) => {
        state.putPersonalDetailsState.isLoading = true;
        state.putPersonalDetailsState.error = null;
      })
      .addCase(putPersonalDetails.fulfilled, (state) => {
        state.putPersonalDetailsState.isLoading = false;
      })
      .addCase(putPersonalDetails.rejected, (state, action) => {
        state.putPersonalDetailsState.isLoading = false;
        state.putPersonalDetailsState.error =
          action.payload || (action.error as ErrorData);
      });
    builder
      .addCase(putPassword.pending, (state) => {
        state.putPasswordState.isLoading = true;
        state.putPasswordState.error = null;
      })
      .addCase(putPassword.fulfilled, (state) => {
        state.putPasswordState.isLoading = false;
      })
      .addCase(putPassword.rejected, (state, action) => {
        state.putPasswordState.isLoading = false;
        state.putPasswordState.error = action.payload || (action.error as ErrorData);
      });
    builder
      .addCase(putProfileImage.pending, (state) => {
        state.putProfileImageState.isLoading = true;
        state.putProfileImageState.error = null;
      })
      .addCase(putProfileImage.fulfilled, (state) => {
        state.putProfileImageState.isLoading = false;
      })
      .addCase(putProfileImage.rejected, (state, action) => {
        state.putProfileImageState.isLoading = false;
        state.putProfileImageState.error = action.payload || (action.error as ErrorData);
      });
  },
});

export default profileEditSlice.reducer;

export const selectPutPersonalDetailsState = (state: RootState) =>
  state.profileEdit.putPersonalDetailsState;

export const selectPutPasswordState = (state: RootState) =>
  state.profileEdit.putPasswordState;

export const selectPutProfileImageState = (state: RootState) =>
  state.profileEdit.putProfileImageState;