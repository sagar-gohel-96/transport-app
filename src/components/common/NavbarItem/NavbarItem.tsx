import { Box, Button, Group, Text, ThemeIcon } from '@mantine/core';
import { ReactNode } from 'react';

interface NavbarItemProps {
  iconColor: string;
  text: string;
  icon: ReactNode;
  index: number;
  itemIndex: number;
  onClick: () => void;
}

export const NavbarItem = ({
  iconColor,
  text,
  icon,
  index,
  itemIndex,
  onClick,
}: NavbarItemProps) => {
  return (
    <Button
      onClick={onClick}
      py={4}
      variant="subtle"
      sx={(theme) => ({
        display: 'flex',
        flex: '1',
        borderTopRightRadius: theme.radius.xl,
        borderBottomRightRadius: theme.radius.xl,
        backgroundColor:
          index === itemIndex
            ? theme.colorScheme === 'dark'
              ? theme.colors.dark[4]
              : theme.colors.primaryBlue[1]
            : '',
        fontSize: theme.fontSizes.xs,
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor:
            index === itemIndex
              ? theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[4]
              : theme.colorScheme === 'dark'
              ? theme.colors.dark[5]
              : theme.colors.gray[2],
        },
      })}
    >
      <Box>
        <Group>
          <ThemeIcon
            variant="light"
            size="xl"
            color="primaryBlue"
            sx={{
              '@media (max-width: 1200px) and (min-width: 760px)': {
                display: 'none',
              },
            }}
          >
            {icon}
          </ThemeIcon>
          <Text
            sx={(theme) => ({
              color: theme.colors.primary,
            })}
            transform="uppercase"
          >
            {text}
          </Text>
        </Group>
      </Box>
    </Button>
  );
};
