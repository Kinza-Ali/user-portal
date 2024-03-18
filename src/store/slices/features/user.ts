import { createSlice } from '@reduxjs/toolkit';
import { fetchUserList } from '../../thunks/user';
interface IUserFeature {
  data: TArrayOfObjects;
  validationStates: {
    isLoading: boolean;
  };
  currentPage:number;
  itemCount:number;
  searchValue: string;
  filter: string;
  selectedUserData:UserInfo;
}

const INITIAL_STATE: IUserFeature = {
  data: [],
  validationStates: {
    isLoading: false,
  },
  currentPage:1,
  itemCount:0,
  searchValue: '',
  filter:'',
  selectedUserData: {},
};

export const userFeatureSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    resetUserfeatures: () => INITIAL_STATE,
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSelectedUserData: (state, action) => {
      state.selectedUserData = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserList.pending, (state) => {
      state.validationStates.isLoading = true;
    });
    builder.addCase(fetchUserList.rejected, (state) => {
      state.validationStates.isLoading = false;
    });
    builder.addCase(fetchUserList.fulfilled, (state, action) => {
      state.validationStates.isLoading = false;
      state.data = action.payload?.results;
      state.itemCount = action.payload?.infor?.results;
    });
  },
});

export const {
  resetUserfeatures,
  setCurrentPage,
  setSearchValue,
  setFilter,
  setSelectedUserData,
} = userFeatureSlice.actions;
export const userFeatureReducer = userFeatureSlice.reducer;
