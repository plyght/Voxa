import React, { useEffect, useContext } from "react";
import theme from "@/styles/theme";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import isPropValid from '@emotion/is-prop-valid'
import useColorScheme from "@/hooks/useColorScheme";
import useWindowDimensions from '../../hooks/useWindowDimensions';

export const SiteContext = React.createContext({});

const SiteContextProvider = SiteContext.Provider;

export const useSite = () => useContext(SiteContext);



const Site = ({ children }) => {
  const {
    colorSchemeSetting,
    colorScheme,
    getColorSchemeSetting,
    setColorScheme,
    getSystemColorScheme
  } = useColorScheme();
  const windowDimensions = useWindowDimensions();

  return (
    <SiteContextProvider value={{
      colorSchemeSetting,
      colorScheme,
      getColorSchemeSetting,
      setColorScheme,
      getSystemColorScheme,
      windowDimensions,
      breakpoint: windowDimensions.breakpoint
    }}>
      <StyleSheetManager
        enableVendorPrefixes
        shouldForwardProp={(propName, elementToBeRendered) => {
          return typeof elementToBeRendered === 'string' ? isPropValid(propName) : true;
        }}
      >
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </StyleSheetManager>
    </SiteContextProvider>
  )
}

export default Site;
