
import { get } from 'lodash';
import { createSelector } from 'reselect';

/**
 *
 * @param state
 * Implementation of memoized selectors using reselect to get particular data out of store.
 */

const userFeatureSelector = (state: TReduxState) => state.root.features.user;

export const getValidationStates = createSelector(
  userFeatureSelector,
  (state) => get(state, 'validationStates')
);

export const getUserSearchValue = createSelector(userFeatureSelector, (data) =>
  get(data, 'searchValue', '')
);
export const getUserFilter = createSelector(userFeatureSelector, (data) =>
  get(data, 'filter', '')
);

export const getUserList = createSelector(userFeatureSelector,
  getUserSearchValue, getUserFilter,
   (data, searchValue,filter ) => {
    const userData = get(data, 'data', [])
    const searcheddData = userData.filter((user: TObject) => user?.name?.first.toLowerCase().includes(searchValue.toLowerCase()) ||
    user?.name?.last.toLowerCase().includes(searchValue.toLowerCase())||
    user?.phone?.toLowerCase().includes(searchValue.toLowerCase()));

    const filteredData = (filter === 'male' || filter === 'female' )? searcheddData?.filter((user: TObject) => user?.gender === filter):
    searcheddData;
    return filteredData;
   }
);

export const getIsLoading = createSelector(
  userFeatureSelector,
  (validationStates) => get(validationStates, 'validationStates.isLoading', false)
);

export const getCurrentPage = createSelector(userFeatureSelector, (data) =>
  get(data, 'currentPage', 1)
);

export const getItemCount = createSelector(userFeatureSelector, (data) =>
  get(data, 'results', 1)
);

export const getSelectedUserInfo = createSelector(userFeatureSelector, (data) =>
  get(data, 'selectedUserData', {}));




