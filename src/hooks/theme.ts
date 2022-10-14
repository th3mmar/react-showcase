import type { ThemeUIContextValue } from 'theme-ui';
import { useThemeUI } from 'theme-ui';
import type { TypedTheme } from '../theme';

// From https://theme-ui.com/guides/typescript/
interface ThemeCtxValue extends Omit<ThemeUIContextValue, 'theme'> {
  theme: TypedTheme;
}
export const useTheme = useThemeUI as unknown as () => ThemeCtxValue;
