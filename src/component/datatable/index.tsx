/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import React, { Fragment, useEffect, useState } from 'react';
import { Box, Table, Thead, Tr, Th, Tbody, Td, HStack, TableContainer } from '@chakra-ui/react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  getExpandedRowModel,
  ColumnDef,
  Row,
} from '@tanstack/react-table';
// import { SortUpIcon, SortDownIcon } from '@root/assets';
import { BLUE, ERROR_BACKGROUND_COLOR, STATUS_FILTERS_COLORS } from '../../constants/colors';
import { Paginate } from '../pagination';
import { isEmpty } from 'lodash';

type DataTableProps<Data extends object> = {
  data: Array<Data>;
  columns: ColumnDef<Data, TObject>[];
  renderSubComponent?: (props: { row: Row<Data> }) => React.ReactElement;
  getRowCanExpand: (row: Row<Data>) => boolean;
  getRowSelected?: (row: Row<Data>) => boolean;
  onRowSelectionChange?: (row: Row<Data>) => boolean;
  onRowSelectionChangeHandler?: (row: TObject) => void;
  pageCount: number;
  page: number;
  pageSize: number;
  handlePageChange: (arg:number)=>void;
  testId?: string;
  getRowId?: (originalRow: Data, index: number, parent?: Row<Data> | undefined) => string;
  centeredCols?: Array<string>;
  canEditRow?: boolean;
  showPagination?: boolean;
  headerColors?: {[key: string]: string}
  isRtl?: boolean;
  showFooter?: boolean;
  resetCheckBoxes?: boolean;
  onSelectRowThroughCheckbox?: any;
  getAllCheckedData?: boolean;
  isDisabledCheckBox?: boolean;
  defaultSortState?:TObject[];

};

export function DataTable<Data extends object>({
  data,
  columns,
  getRowCanExpand,
  renderSubComponent,
  page,
  pageSize,
  pageCount,
  handlePageChange,
  getRowId,
  showPagination = true,
  centeredCols = [],
  canEditRow = true,
  headerColors = {},
  isRtl = false,
  showFooter = false,
  onSelectRowThroughCheckbox,
  onRowSelectionChangeHandler,
  
  defaultSortState = [],
}: DataTableProps<Data>) {

  const [sorting, setSorting] = React.useState<SortingState>(defaultSortState);

  const [expanded, setExpanded] = useState({});
  const [allChecked, setAllChecked] = useState(false);

  const [rowSelection, setRowSelection] = useState<{ [key: string]: boolean }>(
    {}
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    onRowSelectionChange: canEditRow ? setRowSelection : undefined,
    getRowCanExpand,
    state: {
      sorting,
      expanded,
      rowSelection,
    },
    getSubRows: () => undefined,
    getRowId,
  });
  useEffect(() => {
    if (!isEmpty(rowSelection) && onRowSelectionChangeHandler) {
      onRowSelectionChangeHandler(
        table.getSelectedRowModel().flatRows[0]?.original
      );
    }
  }, [onRowSelectionChangeHandler, rowSelection, table]);


  const sendOriginalRow = (rowId: any, check: boolean) => {
    const originalRow = table
      .getRowModel()
      .rows.find((row: TObject) => row.original?.id === rowId);

    if (onSelectRowThroughCheckbox && originalRow) {
      onSelectRowThroughCheckbox(originalRow?.original, check);
    }
  };

  const sendAllDataOnSelectAll = (select: boolean) => {
    const originalRow: any = table
      .getRowModel()
      .rows.map((item: TObject) => ({...item.original, select}));

    if (onSelectRowThroughCheckbox && originalRow) {
      onSelectRowThroughCheckbox(originalRow, select);
    }
  };

  const setSelectionData = (sData: TArrayOfObjects) => {
    const finalSelected: TObject = {};
    const original = table.getRowModel().rows;

    original.forEach((row: TObject) => {
      const { id } = row.original;
      const ifExist = sData?.find((info: any) => info.id === id && info?.select);

      finalSelected[id] = ifExist?.select || false;
    });

    const allSelected = Object.values(finalSelected)?.every((item: any) => item);

    if (allSelected) setAllChecked(true);
    else setAllChecked(false);

    setRowSelection((prev: any) => ({...prev, ...finalSelected}));
  };

  const handleSelectAll = (event: TObject) => {
    const { checked } = event.target;

    setAllChecked(checked);

    setRowSelection((prevRowSelection) => {
      const updatedRowSelection: { [key: string]: boolean } = {};

      Object.keys(prevRowSelection).forEach((rowId) => {
        updatedRowSelection[rowId] = checked;

        if (prevRowSelection[rowId] !== updatedRowSelection[rowId]) {
          sendOriginalRow(rowId, checked);
        }
      });


      return updatedRowSelection;
    });

    sendAllDataOnSelectAll(checked);
  };

  const sendupdatedDataOnSelectOne = (selectedItems: TObject) => {
    const originalRow: any = table
      .getRowModel()
      .rows.map((rData: any) => ({...rData?.original, select: selectedItems[rData?.original?.id] }));

    const isAllSelected = originalRow?.every((item: any) => item.select);

    if (onSelectRowThroughCheckbox && originalRow) {
      onSelectRowThroughCheckbox(originalRow, isAllSelected);
    }
  };

  return (
    <Box borderRadius='8px' border='1px solid #E2E8F0'>
      <TableContainer>
        <Table size='sm'>
          <Thead
            bgColor={ BLUE }
            zIndex={ 5 }
          >
            { table?.getHeaderGroups()?.map((headerGroup) => (
              <Tr key={ headerGroup.id }>
                { headerGroup.headers.map((header, i) => {
                  const { meta }: TObject = header.column.columnDef;

                  const headerTextAlignment = () => {
                    if (centeredCols.includes(header.column.id)) return 'center';
                  };

                  return (
                    <Th
                      borderTopStartRadius={ '0' }
                      borderTopEndRadius={ i === (headerGroup.headers.length - 1) ? '8px' : '0' }
                      key={ header.id }
                      onClick={ header.column.getToggleSortingHandler() }
                      isNumeric={ meta?.isNumeric }
                      color={
                        headerColors?.headerText
                          ? headerColors.headerText
                          : 'white'
                      }
                      p='2'
                      textTransform='capitalize'
                      textAlign={ headerTextAlignment() }
                    >
                      { flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      ) }
                    </Th>
                  );
                }) }
              </Tr>
            )) }
          </Thead>
          <Tbody>
            { table.getRowModel().rows.length &&
          table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row:any) => (
                  <Fragment key={ row.id }>
                    <Tr
                      key={ row.id }
                      _hover={ {
                        backgroundColor: '#F1F2F4',
                      } }
                      backgroundColor={ (row?.original?.isError && !row.original?.isSettled)
                        ? ERROR_BACKGROUND_COLOR : STATUS_FILTERS_COLORS.WHITE }
                    >
                      { row.getVisibleCells().map((cell: any) => {
                        const { meta }: TObject = cell.column.columnDef;

                        if (row.depth === 0) {
                          return (
                            <Td
                              minHeight='52px'
                              key={ cell.id }
                              isNumeric={ meta?.isNumeric }
                              p='3'
                              fontSize='12px'
                              fontWeight={ 400 }
                              textAlign={
                                centeredCols.includes(cell.column.id)
                                  ? 'center'
                                  : 'inherit'
                              }
                              maxW='200px'
                            >
                              { flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              ) }
                            </Td>
                          );
                        }
                      }) }
                    </Tr>
                    { row.getIsExpanded() && renderSubComponent && (
                      <Tr key={ row.id }>
                        <Td colSpan={ row.getVisibleCells().length }>
                          { renderSubComponent({ row }) }
                        </Td>
                      </Tr>
                    ) }
                  </Fragment>
                ))
              ) : (
                <Tr>
                  <Td colSpan={ columns.length } textAlign='center' p='10'>
                    No record Found
                  </Td>
                </Tr>
              ) }

            { showFooter
              ? table.getFooterGroups().map((footerGroup) => (
                <Tr key={ footerGroup.id }>
                  { footerGroup.headers.map((header) => (
                    <Td
                      minHeight='52px'
                      key={ header.id }
                      p='3'
                      fontSize='12px'
                      fontWeight={ 700 }
                    >
                      { header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        ) }
                    </Td>
                  )) }
                </Tr>
              ))
              : null }
          </Tbody>
        </Table>
      </TableContainer>
      { showPagination ? (
        <HStack justifyContent='flex-end' alignItems='center'>
          <Paginate
            page={ page }
            count={ pageCount }
            pageSize={ pageSize }
            onPageChange={ handlePageChange }
            margin={ 1 }
            variant='ghost'
            isRtl={ isRtl }
          />
        </HStack>
      ) : null }
    </Box>
  );
}
