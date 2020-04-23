import { createMuiTheme } from '@material-ui/core/styles';

import colors from './settings/colors';
import setType from './mixins/setType';

// const muiTheme = createMuiTheme();

// console.group('docTheme.js');
// console.log('muiTheme:', muiTheme);
// console.groupEnd();

export default createMuiTheme({
  colors: colors,

  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  typography: {
    h1: {
      ...setType(900),
      fontWeight: 'medium',
    },
    h2: {
      ...setType(800),
      fontWeight: 'medium',
    },
    h3: {
      ...setType(700),
      fontWeight: 'medium',
    },
    h4: {
      ...setType(600),
      fontWeight: 'normal',
    },
    h5: {
      ...setType(500),
      fontWeight: 'normal',
    },
    h6: {
      ...setType(400),
      fontWeight: 'normal',
    },
    body1: {
      ...setType(400),
      fontWeight: 'normal',
    },
    body2: {
      ...setType(300),
      fontWeight: 'normal',
    },
    caption: {
      ...setType(200),
      fontWeight: 'normal',
    },
  },
});
