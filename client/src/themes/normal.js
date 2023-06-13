import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Normal or default theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3b56a2',
      text: '#ffffff',
    },
    secondary: {
      main: '#cc4444',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f5f5f5',
    },
    titleBar: {
      main: '#eeeeee',
      contrastText: '#222222',
    },
  },
  direction: 'rtl',
})

export default theme