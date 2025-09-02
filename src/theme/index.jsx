import PropTypes from 'prop-types';
import { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { useRecoilValue } from 'recoil';
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
import { DarkMode } from '@recoil/DarkMode';
import { customShadows } from './customShadows';
import { overrides } from './override';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children, enableDarkMode = true }) {
  const darkModeState = useRecoilValue(DarkMode)
  const memoizedValue = useMemo(() => ({
      palette: palette(enableDarkMode ? darkModeState : 'light'),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }), [darkModeState, enableDarkMode]);

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
