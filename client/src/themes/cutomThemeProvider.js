import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import RTL from "./rtl";
import getTheme from './index'

// eslint-disable-next-line no-unused-vars
export const CustomThemeContext = React.createContext(
  {
    currentTheme: 'normal',
    setTheme: null,
  },
)

const CustomThemeProvider = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props

  // Read current theme from localStorage or maybe from an api
  const currentTheme = localStorage.getItem('appTheme') || 'normal'

  // State to hold the selected theme name
  const [themeName, _setThemeName] = useState(currentTheme)

  // Retrieve the theme object by theme name
  const theme = getTheme(themeName)

  // Wrap _setThemeName to store new theme names in localStorage
  const setThemeName = (name) => {
    localStorage.setItem('appTheme', name)
    _setThemeName(name)
  }

  const contextValue = {
    currentTheme: themeName,
    setTheme: setThemeName,
  }

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <RTL>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </RTL>
    </CustomThemeContext.Provider>
  )
}

export default CustomThemeProvider;