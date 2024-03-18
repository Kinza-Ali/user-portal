import { createAsyncThunk } from '@reduxjs/toolkit';
import { PAGE_COUNT } from 'src/constants/common';
import { UserService } from 'src/services/user';
import { getCurrentPage } from '../selectors/features/user';

const userService = new UserService();

export const fetchUserList = createAsyncThunk<
  TObject,
  TObject,
  IActionOptions
>(
  'User/fetchUserList',
  async ( _requestPayload, thunkAPI) => {
    const url = 'https://randomuser.me/api/';
    const currentPage = getCurrentPage(thunkAPI.getState());
    const data:TObject = {
      page: currentPage,
      results: PAGE_COUNT,
    };

    const response = await userService.fetchUserList(url, data );

    if (response?.error) {
      return thunkAPI.rejectWithValue({ ...response?.data });
    }

    return thunkAPI.fulfillWithValue(response?.data);
  })