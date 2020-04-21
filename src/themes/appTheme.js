import { createMuiTheme } from '@material-ui/core/styles';

import colors from './settings/colors';

const muiTheme = createMuiTheme();

// console.group('appTheme.js');
// console.log('muiTheme:', muiTheme);
// console.groupEnd();

export default createMuiTheme({
  colors: colors,

  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiButton: {
      disableElevation: true,
    },
  },

  overrides: {
    // disable all animations
    // MuiCssBaseline: {
    //   '@global': {
    //     '*, *::before, *::after': {
    //       transition: 'none !important',
    //       animation: 'none !important',
    //     },
    //   },
    // },

    // Tabs

    MuiButton: {
      root: {
        minWidth: 'none',
      },
    },

    MuiTab: {
      root: {
        minWidth: 64,
        padding: '6px',
        [muiTheme.breakpoints.up('sm')]: {
          padding: '6px',
        },
        [muiTheme.breakpoints.up('sm')]: {
          minWidth: 64,
        },
      },
    },

    // Forms
    MuiFilledInput: {
      root: {
        borderBottomLeftRadius: muiTheme.shape.borderRadius,
        borderBottomRightRadius: muiTheme.shape.borderRadius,
      },
    },

    // Tooltips
    MuiTooltip: {
      tooltip: {
        ...muiTheme.typography.body2,
      },
    },

    // Expansion Panels
    MuiExpansionPanel: {
      root: {
        background: muiTheme.palette.background.default,
        '&:before': {
          top: 'auto',
          bottom: 1,
        },
        '&:first-child': {
          '&:before': {
            display: 'block',
          },
        },
        '&$expanded': {
          margin: '0 0',
          '&:before': {
            opacity: 1,
          },
        },
        '&$expanded + &': {
          '&:before': {
            display: 'block',
          },
        },
      },
    },
    MuiExpansionPanelSummary: {
      root: {
        padding: '0',
        marginLeft: `${muiTheme.spacing(3)}px`,
        marginRight: `${muiTheme.spacing(3)}px`,
        '&$expanded': {
          borderBottom: `1px solid ${muiTheme.palette.divider}`,
          marginLeft: `${muiTheme.spacing(3)}px`,
          marginRight: `${muiTheme.spacing(3)}px`,
          minHeight: 8 * 6,
          padding: '0',
        },
        '&$focused': {
          backgroundColor: muiTheme.palette.grey[300],
        },
      },
      content: {
        margin: '0 0',
        '&$expanded': {
          margin: '0 0',
        },
      },
    },

    MuiExpansionPanelDetails: {
      root: {
        padding: `${muiTheme.spacing(2)}px ${muiTheme.spacing(3)}px`,
      },
    },
  },
});
