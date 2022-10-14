import { FC, ReactNode, useEffect, useRef } from 'react';

import { Input, Container } from 'theme-ui';

interface IProps {
  placeholder: string;
  value: string;
  onChange: any;
  onFocus: any;
  onKeyDown: any;
  onKeyPress: any;
  autoFocus: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  type: string;
  inputSx?: {};

  inputContainerSx?: {};

  leftIconContainerSx?: {};

  rightIconContainerSx?: {};
}

const InputProps: FC<IProps> = ({
  placeholder,
  value,
  onChange,
  onFocus,
  onKeyDown,
  onKeyPress,
  inputSx,
  inputContainerSx,
  leftIconContainerSx,
  rightIconContainerSx,
  autoFocus,
  leftIcon,
  rightIcon,
  type,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    /**
     * Focusses on the input box if the autoFocus prop is true.
     */
    !!autoFocus && inputRef.current?.focus();
  }, []);

  const leftIconNode = () => {
    if (!leftIcon) {
      return null;
    }

    return <Container sx={leftIconContainerSx}>{leftIcon}</Container>;
  };
  const rightIconNode = () => {
    if (!rightIcon) {
      return null;
    }

    return <Container sx={rightIconContainerSx}>{rightIcon}</Container>;
  };

  return (
    <Container sx={inputContainerSx}>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
        ref={inputRef}
        sx={inputSx}
      />
      {leftIconNode()}
      {rightIconNode()}
    </Container>
  );
};

export default InputProps;
