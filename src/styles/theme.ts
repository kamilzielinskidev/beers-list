import { G } from '@mobily/ts-belt';
import { createTheme } from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import { blue, green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: green[500],
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
  },
});

export { theme };

export type AppTheme = typeof theme;
export type Styles = SystemStyleObject<AppTheme> | ((theme: AppTheme) => SystemStyleObject<AppTheme>);

export const mergeStyles =
  (styles: Styles[]) =>
  (appTheme: AppTheme): SystemStyleObject<AppTheme> => {
    return styles.reduce<SystemStyleObject<AppTheme>>((acc, next) => {
      return G.isFunction(next) ? { ...acc, ...next(appTheme) } : { ...acc, ...next };
    }, {});
  };

export const createStylesMap = <T extends Record<string, Styles>>(stylesMap: T) => stylesMap;
