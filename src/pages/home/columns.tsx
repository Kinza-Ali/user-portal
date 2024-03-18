import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { Avatar, Button, Tag } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';

const columnHelper = createColumnHelper<TObject>();

export const getColumns = () => [
  columnHelper.accessor('name.first', {
    cell: (info) => info.getValue(),
    header: 'Name',
  }),
  columnHelper.accessor('gender', {
    cell: (info) => info.getValue(),
    header: 'Gender',
  }),
  columnHelper.accessor('picture.thumbnail', {
    cell: ( info ) => {
      const imgUrl = info?.getValue();
      return(
        <Avatar size="xs" src={imgUrl}/>
      )
    },
    header: 'Avatar',
  }),
  columnHelper.accessor('location.country', {
    cell: (info) => info.getValue(),
    header: 'Country',
  }),
  columnHelper.accessor('email', {
    cell: (info) => info.getValue(),
    header: 'Email',
  }),
  columnHelper.accessor('phone', {
    cell: (info) => info.getValue(),
    header: 'Phone',
  }),
  columnHelper.accessor('dob.age', {
    cell: (info) => info.getValue(),
    header: 'Age',
  }),
  columnHelper.accessor('', {
    cell: ({ row }) => (
     
      <Button
        variant='outline'
        bg='#f6f6f6'
      
        { ...{
          onClick: row.getToggleSelectedHandler(),
          style: { cursor: 'pointer' },
        } }
        size='xs'
      >
        {<ViewIcon/>}
      </Button>
    ),
    header: ' ',
  }),
];
