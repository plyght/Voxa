import { useEffect, useState } from 'react';

const getColorSchemeSetting = () =>
  window.localStorage.getItem('colorScheme') ?? 'auto';

const getSystemColorScheme = () =>
  typeof window.matchMedia !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

const useColorScheme = () => {
  const [colorSchemeSetting, setColorSchemeSetting] = useState();
  const [colorScheme, setColorSchemeState] = useState();

  const setColorScheme = (colorScheme) => {
    if (['light', 'dark'].includes(colorScheme)) {
      window.localStorage.setItem('colorScheme', colorScheme);
      setColorSchemeState(colorScheme);
    } else {
      window.localStorage.removeItem('colorScheme');
      setColorSchemeState(getSystemColorScheme());
    }
  };

  useEffect(() => {
    document.children[0].setAttribute('data-color-scheme', colorScheme);
  }, [colorScheme]);

  useEffect(() => {
    const initialColorScheme = getColorSchemeSetting();
    const handleChange = () => setColorScheme(getColorSchemeSetting());

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handleChange);

    setColorScheme(initialColorScheme);
    setColorSchemeSetting(initialColorScheme);

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleChange);
    };
  }, []);

  return {
    colorSchemeSetting,
    colorScheme,
    getColorSchemeSetting,
    setColorScheme,
    getSystemColorScheme,
  };
};

export default useColorScheme;
