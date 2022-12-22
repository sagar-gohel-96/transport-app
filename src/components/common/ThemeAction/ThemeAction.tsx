import {
  ActionIcon,
  Group,
  ThemeIcon,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";

export const ThemeAction = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="center" my="xl">
      <UnstyledButton
        onClick={() => toggleColorScheme()}
      >
        {colorScheme === "dark" ? (
          <ThemeIcon variant="light" size="xl" color="blue" radius="xl">
            <IconSun size={22} />
          </ThemeIcon>
        ) : (
          <ThemeIcon variant="light" size="xl" color="blue" radius="xl">
            <IconMoonStars size={22} />
          </ThemeIcon>
        )}
      </UnstyledButton>
    </Group>
  );
};
