import { ThemeUICSSObject } from 'theme-ui';

export const toastIcon: ThemeUICSSObject = {
  justifyContent: 'center',
  alignContent: 'center',
  flex: '1 1 auto',
  paddingRight: '3',
  '&.success': {
    path: {
      fill: 'successDefault',
    },
  },
  '&.error': {
    path: {
      fill: 'errorDefault',
    },
  },
};
export const toastHeader: ThemeUICSSObject = {
  minWidth: '250px',
  Button: {
    position: 'absolute',
    right: '3',
    top: '3',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '50%',
    transition: '0.3s',
    paddingY: '5px',
    paddingX: '7px',
    width: 'auto',
    height: 'auto',
    img: {
      width: '9px',
      height: '9px',
    },
    '&:hover': {
      backgroundColor: 'primaryHighlight',
    },
  },
};
