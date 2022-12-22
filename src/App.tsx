import { Home } from './module';
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Box,
} from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { Colors, ThemeColor } from './theme';
import { NotificationsProvider } from '@mantine/notifications';
import { AuthRoutes } from './Routes';
import { useAuth, useLocalStorage } from './hooks';
import { ModalsProvider } from '@mantine/modals';
import { LoadingIndicator } from './components/common';
import { useEffect } from 'react';
import { config } from './utils';
import { useAppDispatch } from './store';
import { authAction } from './store/auth-slice';

function App() {
  const { getLocalStorageItem: colorScheme, setLocalStorageItem } =
    useLocalStorage<ColorScheme>('color-scheme');

  const { user, isInitialised } = useAuth();
  const dispatch = useAppDispatch();

  const { getLocalStorageItem: userLocalStorage } = useLocalStorage(
    config.userLocalStorageKey as string
  );

  useEffect(() => {
    if (userLocalStorage) {
      const userLocalData =
        userLocalStorage && JSON.parse(userLocalStorage as any);

      const userAuth = {
        initialized: true,
        user: userLocalData.user,
        token: userLocalData.token,
      };

      dispatch(authAction.updateState(userAuth));
    } else {
      dispatch(authAction.updateState({ initialized: true }));
    }
  }, [dispatch, userLocalStorage]);

  const toggleColorScheme = (value: ColorScheme) => {
    setLocalStorageItem(value || colorScheme === 'dark' ? 'light' : 'dark');
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
            primaryBlue: Colors.primaryBlue,
            primaryRed: ThemeColor.primaryRed,
          },
        }}
      >
        <ModalsProvider labels={{ confirm: 'Submit', cancel: 'Cancel' }}>
          <NotificationsProvider position="top-right">
            <BrowserRouter>
              {!isInitialised && (
                <LoadingIndicator isLoading loadingType="overlay" />
              )}
              {!user && !isInitialised && (
                <Box sx={{ position: 'relative', width: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flex: 1,
                      height: '100vh',
                      width: '100%',
                      position: 'absolute',
                      zIndex: 10,
                    }}
                  >
                    <AuthRoutes />
                  </Box>
                  {/* <BackgroundImage
                    src="https://source.unsplash.com/random/"
                    sx={{ opacity: 0.8, height: "100vh", position: "relative" }}
                  /> */}
                </Box>
              )}
              {user && <Home />}
            </BrowserRouter>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
