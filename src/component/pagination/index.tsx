/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { Button, HStack, Stack } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';

export const Paginate = (props: PaginateProps) => {

  const {
    count,
    pageSize,
    page,
    onPageChange,
    size = 'sm',
    selectedVariant = 'solid',
    variant = 'ghost',
    previousIcon = <ArrowBackIcon boxSize='5' color='#8B94A2' />,
    nextIcon = <ArrowForwardIcon boxSize='5' color='#8B94A2' />,
    fontWeight = 'light',
    borderRadius = 'sm',
    isRtl = false,
    ...rest
  } = props;

  const numberOfPages = Math.ceil(count / pageSize);

  const handlePageClick = (i: number) => {
    let newPage = i;

    if (i >= numberOfPages) {
      newPage = numberOfPages;
    } else if (i <= 0) {
      newPage = 1;
    }

    onPageChange(newPage);
  };

  const shouldRender = (idx: number) =>
    idx === page ||
    (idx >= page - 2 && idx <= page + 2) ||
    idx === 1 ||
    idx === numberOfPages;

  const shouldRenderEllipsis = (idx: number) =>
    (idx === page + 3 && idx !== numberOfPages) ||
    (idx === page - 3 && idx !== 1);

  const showPagination = numberOfPages > 1;
  const showPreviousButton = showPagination && page > 1;
  const showNextButton = showPagination && page < numberOfPages;

  if (!showPagination) {
    return null;
  }

  return (
    <Stack p={ 5 }>
      <HStack>
        { showPreviousButton && (
          <Button
            { ...rest }
            fontWeight={ fontWeight }
            borderRadius={ borderRadius }
            size={ size }
            variant={ variant }
            aria-label='previous'
            leftIcon={ isRtl ? nextIcon : previousIcon }
            onClick={ (e) => {
              e.preventDefault();
              handlePageClick(page - 1);
            } }
            disabled={ page === 1 }
          >
           prev
          </Button>
        ) }
        { Array(numberOfPages)
          .fill(0)
          .map((_, i) => {
            if (shouldRender(i + 1)) {
              return (
                <Button
                  key={ i }
                  { ...rest }
                  fontWeight={ fontWeight }
                  borderRadius={ borderRadius }
                  size={ size }
                  variant={ page === i + 1 ? selectedVariant : variant }
                  onClick={ (e) => {
                    e.preventDefault();
                    handlePageClick(i + 1);
                  } }
                >
                  { i + 1 }
                </Button>
              );
            } else if (shouldRenderEllipsis(i + 1)) {
              return (
                <Button
                  key={ i }
                  { ...rest }
                  fontWeight={ fontWeight }
                  borderRadius={ borderRadius }
                  size={ size }
                  variant={ variant }
                  pointerEvents='none'
                >
                  ...
                </Button>
              );
            }

            return null;
          }) }
        { showNextButton && (
          <Button
            { ...rest }
            fontWeight={ fontWeight }
            borderRadius={ borderRadius }
            aria-label='next'
            rightIcon={ isRtl ? previousIcon : nextIcon }
            onClick={ (e) => {
              e.preventDefault();
              handlePageClick(page + 1);
            } }
            size={ size }
            variant={ variant }
            disabled={ page === numberOfPages }
          >
            Next
          </Button>
        ) }
      </HStack>
    </Stack>
  );
};
