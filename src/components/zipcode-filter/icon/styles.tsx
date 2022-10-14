export const AddIconSX = {
  backgroundColor: 'primaryDefault',
  borderRadius: '2',
  padding: '1',
  font: 'neutralDark',
  cursor: 'pointer',
  transition: '0.3s',
  '&:hover': {
    backgroundColor: 'primaryHover',
  },
  '&:focus:active': {
    backgroundColor: 'primaryDefault',
    outlineOffset: '6px',
    outlineWidth: '1px',
    outlineStyle: 'solid',
    outlineColor: 'primaryDefault',
  },
};

export const CancelIconSx = {
  cursor: 'pointer',
  transition: '0.3s',
  path: {
    fill: 'neutralDark',
  },
  '&:hover': {
    backgroundColor: 'primaryHighlight',
  },
};
