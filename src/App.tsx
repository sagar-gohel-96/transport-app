import { Home } from "./module";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Box,
} from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { Colors, ThemeColor } from "./theme";
import { NotificationsProvider } from "@mantine/notifications";
import { AuthRoutes } from "./Routes";
import { useAuth, useLocalStorage } from "./hooks";

function App() {
  const { getLocalStorageItem: colorScheme, setLocalStorageItem } =
    useLocalStorage<ColorScheme>("color-scheme");
  const { user } = useAuth();

  const toggleColorScheme = (value: ColorScheme) => {
    setLocalStorageItem(value || colorScheme === "dark" ? "light" : "dark");
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
          primaryColor: "primaryBlue",
          colors: {
            primaryBlue: Colors.primaryBlue,
            primaryRed: ThemeColor.primaryRed,
          },
        }}
      >
        <NotificationsProvider position="top-right">
          <BrowserRouter>
            {!user ? (
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  height: "100vh",
                }}
              >
                <AuthRoutes />
              </Box>
            ) : (
              <Home />
            )}
          </BrowserRouter>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
