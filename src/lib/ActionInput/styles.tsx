export const inputContainerSx = {
  position: 'relative',
  height: 'auto',
  border: '1px solid',
  borderColor: 'secondaryDisabled',
  borderRadius: '3',
  paddingY: '2',
  marginBottom: '4',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:focus': {
    borderColor: 'secondaryPressed',
  },
  '&::placeholder': {
    color: 'secondaryPressed',
  },
};

export const inputSx = {
  variant: 'text.labelLg',
  border: 'none',
  padding: '0',
  marginRight: '5',
  borderRadius: 'unset',
  height: '32px',
  '&:focus': {
    border: 'none',
    color: 'neutralDark',
    outline: 'none',
  },
};
export const leftIconContainerSx = {
  color: 'neutralDark',
  width: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  order: '-1',
};
export const rightIconContainerSx = {
  color: 'neutralDark',
  width: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
};
