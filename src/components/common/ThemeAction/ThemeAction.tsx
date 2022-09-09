import {
  ActionIcon,
  Group,
  ThemeIcon,
  useMantineColorScheme,
} from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

export const ThemeAction = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="center" my="xl">
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="lg"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.yellow[4]
              : theme.colors.blue[6],
        })}
      >
        {colorScheme === 'dark' ? (
          <ThemeIcon variant="outline" size="xl" color="gray">
            <IconSun size={22} />
          </ThemeIcon>
        ) : (
          <ThemeIcon variant="outline" size="xl" color="dark">
            <IconMoonStars size={22} />
          </ThemeIcon>
        )}
      </ActionIcon>
    </Group>
  );
};
