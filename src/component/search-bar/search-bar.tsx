import React, { FC } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Input,
  InputGroup,
  Box,
  InputLeftElement,
} from '@chakra-ui/react';
import { BLUE } from 'src/constants/colors';
interface ISearchInput {
  clearSearch?: (a: TObject) => void;
  value?: string;
  onChange?: (a: TObject) => void;
  showOptions?: boolean;
  onFocus?: (a: TObject) => void;
  onBlur?: (a: TObject) => void;
  placeholder?: string,
  isCloseIcon?:boolean;
  isDisable?: boolean;
  children? : ReactNode;
}

export const SearchBar: FC<ISearchInput> = ({
  value,
  onChange,
  onFocus,
  children,
  placeholder,
  onBlur,
  isDisable = false,
}) => (
  <Box position='relative'>
    <InputGroup>
      <InputLeftElement>
        <SearchIcon color={BLUE}/>
      </InputLeftElement>
      <Input
        placeholder={ placeholder }
        value={ value }
        onChange={ onChange }
        onFocus={ onFocus }
        bg='#f6f6f6'
        disabled= { isDisable }
        onBlur={ onBlur }
      />
    </InputGroup>
    { children }
  </Box>
);
