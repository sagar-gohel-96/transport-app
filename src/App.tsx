import { Home } from "./module";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { BrowserRouter } from "react-router-dom";
import { Colors, ThemeColor } from "./theme";
import { NotificationsProvider } from "@mantine/notifications";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "dark",
  });

  const toggleColorScheme = (value: ColorScheme) => {
    setColorScheme(value || colorScheme === "dark" ? "light" : "dark");
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
            <Home />
          </BrowserRouter>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
