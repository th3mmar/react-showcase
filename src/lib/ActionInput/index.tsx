import { ChangeEvent, FC, ReactNode, useRef } from 'react';
import { Container } from 'theme-ui';

import useOutsideClick from './hooks/use-outside-click';
import InputBox from './input';
import {
  inputSx,
  leftIconContainerSx,
  rightIconContainerSx,
  inputContainerSx,
} from './styles';

const StyledContainer = ({ children }) => <Container>{children}</Container>;

type Record = { item: { key: string; value: string } };

interface IProps {
  /*
   * The placeholder text for the input box.
   */
  placeholder?: string;
  /*
   * The value for the input box.
   */
  value?: string;

  /*
   * Focus on the input box once the component is mounted.
   */
  autoFocus?: boolean;

  /*
   * A function which acts as a callback when the input is focussed.
   */
  onFocus?: () => void;
  /*
   * A function which acts as a callback when the input value is changed.
   */
  onChange?: (value: string) => void;
  /*
   * A function which acts as a callback when key down.
   */
  onKeyDown?: any;
  /*
   * A function which acts as a callback when key pressed.
   */
  onKeyPress?: any;

  /*
   * Icon to be rendered on the left of the input box.
   */
  leftIcon?: ReactNode;
  /*
   * Icon to be rendered on the right of the input box.
   */
  rightIcon?: ReactNode;

  /*
   * The type of the input.
   */
  type?: string;

  inputSx?: {};

  inputContainerSx?: {};

  leftIconContainerSx?: {};

  rightIconContainerSx?: {};
}

const ActionInput: FC<IProps> = ({
  placeholder = '',
  value = '',
  autoFocus = false,
  onFocus,
  onChange,
  onKeyDown,
  onKeyPress,
  leftIcon,
  rightIcon,
  type = 'text',
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(wrapperRef);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    /**
     * Trigger the 'onChange' prop once the input's value changes.
     */
    !!onChange && onChange(value);
  };

  const inputNode = () => {
    /**
     * This function is responsible for rendering the input box.
     * The input box acts as a source of entry for the data from the user.
     * Once the user enters the value, it's checked if that value matches
     * with any value which is present in the 'data' prop. If any value
     */

    return (
      <InputBox
        placeholder={placeholder}
        value={value}
        onKeyDown={onKeyDown ? onKeyDown : undefined}
        onKeyPress={onKeyPress ? onKeyPress : undefined}
        onChange={handleInputChange}
        autoFocus={autoFocus ? autoFocus : false}
        onFocus={onFocus ? onFocus : undefined}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        type={type}
        inputSx={inputSx}
        inputContainerSx={inputContainerSx}
        leftIconContainerSx={leftIconContainerSx}
        rightIconContainerSx={rightIconContainerSx}
      />
    );
  };

  return (
    <div ref={wrapperRef}>
      <StyledContainer>{inputNode()}</StyledContainer>
    </div>
  );
};

export { ActionInput };
