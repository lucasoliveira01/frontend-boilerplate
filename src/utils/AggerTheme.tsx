import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    highlight: Palette['primary'];
  }

  interface PaletteOptions {
    highlight?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    highlight: true;
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    planoMobile: true;
    laptop: true;
    desktop: true;
  }
}

// COLORS
export const AggerPrimaryColor = '#005b87';
export const AggerHighlightColor = '#FFD526';

export const AggerWhiteColor = '#fff';
export const AggerLightGrayColor = '#666666';
export const AggerDarkGrayColor = '#003050';

const Theme =
  // responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: AggerPrimaryColor,
        contrastText: AggerWhiteColor,
      },
      secondary: {
        main: AggerWhiteColor,
        contrastText: AggerLightGrayColor,
      },
      highlight: {
        // main: "#fbbb21",
        main: AggerHighlightColor,
        contrastText: AggerWhiteColor,
      },
      text: {
        primary: AggerDarkGrayColor,
        secondary: AggerWhiteColor,
      },
    },
    typography: {
      fontFamily: 'inherit',
      // fontFamily: [
      //   'Asap Regular',
      //   'Asap Medium',
      //   'Asap SemiBold',
      //   'Asap Bold',
      //   'K2D Thin',
      //   'K2D ExtraLight',
      //   'K2D Light',
      //   'K2D Regular',
      //   'K2D SemiBold',
      //   'K2D Bold',
      //   'K2D ExtraBold',
      // ].join(','),
      fontSize: 16,
    },
    breakpoints: {
      values: {
        // DEFAULT
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
        // CUSTOM
        mobile: 0,
        tablet: 640,
        planoMobile: 800,
        laptop: 1024,
        desktop: 1200,
      },
    },
  });
// );

export default Theme;
