import { ReactNode } from 'react';
import { Container, IconButton } from 'theme-ui';
import { AddIconSX, CancelIconSx } from './styles';
import SearchSvg from '../../../assets/images/Search.svg';
import Add from '../../../assets/images/add.svg';
import ClearField from '../../../assets/images/roundedDelete.svg';

const IconContainer = ({ children, onClick }) => (
  <Container onClick={onClick}>{children}</Container>
);

const SearchIcon = ({ onClick }) => (
  <IconContainer onClick={onClick}>
    <img src={SearchSvg} alt="search" />
  </IconContainer>
);

const AddIcon = ({ onClick }) => (
  <IconContainer onClick={onClick}>
    <IconButton aria-label="Toggle dark mode" sx={AddIconSX}>
      <img src={Add} alt="add" />
    </IconButton>
  </IconContainer>
);
const CancelIcon = ({ onClick }) => (
  <IconContainer onClick={onClick}>
    <IconButton aria-label="Toggle dark mode" sx={CancelIconSx}>
      <img src={ClearField} alt="clear" />
    </IconButton>
  </IconContainer>
);

const LoadingIcon = ({ onClick }) => (
  <IconContainer onClick={onClick}>
    <IconButton aria-label="Toggle dark mode" sx={CancelIconSx}>
      <img src={SearchSvg} alt="clear" />
    </IconButton>
  </IconContainer>
);

export { IconContainer, SearchIcon, AddIcon, CancelIcon, LoadingIcon };
