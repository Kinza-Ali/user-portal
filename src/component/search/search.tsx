import React from 'react';
import { Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBar } from '../search-bar';
import { getUserSearchValue } from 'src/store/selectors/features/user';
import { setSearchValue } from 'src/store/slices/features';

export const Search = () => {
  const dispatch = useDispatch();
  const search: string = useSelector(getUserSearchValue);

  const onChange = (e: TObject) => {
    dispatch(setSearchValue(e.target.value.trim()));
  };

  const renderUserSearch = () => (
    <Box
      flex='1'
    >
      <SearchBar
        placeholder = 'Search Values...'
        onChange={ onChange }
        value={ search  }
      >
      </SearchBar>
    </Box>
  );

  return (
    <>
      {renderUserSearch() }
    </>
  );
};
