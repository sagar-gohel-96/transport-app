import { Home } from './module';
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'dark',
  });

  const toggleColorScheme = (value: ColorScheme) => {
    setColorScheme(value || colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          primaryShade: 6,
          primaryColor: 'primaryBlue',
          colors: {
            primaryBlue: [
              '#E7F5FF',
              '#D9EDFE',
              '#B3D8FD',
              '#8DBFFB',
              '#70A8F8',
              '#4285F4',
              '#3066D1',
              '#214BAF',
              '#15348D',
              '#0C2375',
            ],
          },
        }}
      >
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
