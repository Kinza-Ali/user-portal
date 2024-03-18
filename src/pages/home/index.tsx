import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Select,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { DataTable } from 'src/component/datatable';
import { getColumns } from './columns';
import { FiFilter } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserList } from '../../store/thunks/user';
import { getCurrentPage, getSelectedUserInfo, getUserList } from 'src/store/selectors/features/user';
import { setCurrentPage, setFilter, setSelectedUserData } from 'src/store/slices/features';
import { Search } from 'src/component/search/search';
import { Profile } from '../profile';
import { isEmpty } from 'lodash';
import { FaBuromobelexperte, FaTable } from "react-icons/fa";
import { VIEW_MODE } from 'src/constants/common';
import { GridLayout } from 'src/component/grid';
import { getIsLoading } from 'src/store/selectors/features';
import { BLUE, GRAY, WHITE } from 'src/constants/colors';


export const Home = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(getCurrentPage);
  const slectedUserInfo: UserInfo = useSelector(getSelectedUserInfo);
  const isUsersLoading = useSelector(getIsLoading);
  console.log(isUsersLoading)
  const userData = useSelector(getUserList);

  const [viewMode, setViewMode] = useState(VIEW_MODE.TABLE);

  useEffect(() => {
    dispatch(fetchUserList({}));
  }, []);

  const handlePagination = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(fetchUserList({}));
  };

  const handleRowEditClick = (rowData: TObject) => {
    dispatch(setSelectedUserData(rowData));
  };

  const handleFilter = (e: TObject) => {
    dispatch(setFilter(e.target.value));

  }

  const handleDataListing = (mode: VIEW_MODE) => {
    setViewMode(mode);
  }

  const renderData = () => {
    return (
      !isEmpty(slectedUserInfo) ? <Profile /> :
        viewMode === VIEW_MODE.TABLE ? <DataTable
          columns={getColumns()}
          data={userData || []}
          getRowCanExpand={() => false}
          page={currentPage}
          pageCount={100}
          pageSize={10}
          handlePageChange={handlePagination}
          canEditRow
          onRowSelectionChangeHandler={handleRowEditClick}
        /> : <GridLayout userData={userData} onClick={handleRowEditClick} />

    )
  }

  return (
    <Box backgroundColor={WHITE} justifyContent='flex-start' alignItems='center'>
      {
        isEmpty(slectedUserInfo) ?
          <>
            <Flex justify={'space-between'} mr={'32px'} mt={'24px'}>
              <Box ml={'25px'}>
                <Text fontWeight={500} fontSize={'32px'} color={BLUE}>Kwanso</Text>
              </Box>
              <HStack>
                <Box maxW={'400px'} mr={'20px'}>
                  <Search />
                </Box>
                <Select
                  icon={<FiFilter />} width={'140px'} iconColor={BLUE}
                  color={BLUE} backgroundColor={GRAY} onChange={handleFilter}>
                  <option value='reset'>Apply Filter</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </Select>
                <IconButton variant="outline" aria-label="Search database" color={BLUE} icon={<FaTable />} mr={'8px'}
                  backgroundColor={viewMode === VIEW_MODE.TABLE ? GRAY : WHITE}
                  onClick={() => handleDataListing(VIEW_MODE.TABLE)} />
                <IconButton variant="outline" aria-label="Search database" color={BLUE} icon={<FaBuromobelexperte />} mr={'8px'}
                  backgroundColor={viewMode === VIEW_MODE.GRID ? GRAY : WHITE}
                  onClick={() => handleDataListing(VIEW_MODE.GRID)} />
              </HStack>
            </Flex></> :
          <>
          </>
      }
      <Box p={'24px'} >
        {isUsersLoading ? (

          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}
            height={'60vh'}
          >
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              height={'50px'}
              width={'50px'}
            />
          </Box>
        ) : renderData()}

      </Box>
    </Box>
  );
};
