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
    <Box
      onClick={onClick}
      sx={(theme) => ({
        backgroundColor:
          index === itemIndex
            ? theme.colorScheme === 'dark'
              ? theme.colors.dark[4]
              : theme.colors.gray[4]
            : '',
        paddingBlock: theme.spacing.xs,
        borderRadius: theme.radius.md,
        cursor: 'pointer',
        marginBottom: '4px',
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
      <Button
        variant="subtle"
        sx={(theme) => ({
          background:
            index === itemIndex
              ? theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[4]
              : '',
          color: theme.colorScheme === 'dark' ? 'white' : 'black',
          fontSize: theme.fontSizes.sm,
          fontWeight: 500,
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
            <ThemeIcon variant="light" size="lg" color={iconColor}>
              {icon}
            </ThemeIcon>
            <Text>{text}</Text>
          </Group>
        </Box>
      </Button>
    </Box>
  );
};
