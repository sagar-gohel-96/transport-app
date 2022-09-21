import { Box, Button, Group, Text, ThemeIcon } from '@mantine/core';
import { NavbarItemListType } from '../../layout';

interface NavbarItemProps {
  item: NavbarItemListType;
  pathRef: any;
  onClick: () => void;
}

export const NavbarItem = ({ item, pathRef, onClick }: NavbarItemProps) => {
  const { text, icon } = item;

  return (
    <Button
      onClick={onClick}
      variant="subtle"
      size="md"
      sx={(theme) => ({
        display: 'flex',
        flex: '1',
        borderTopRightRadius: theme.radius.xl,
        borderBottomRightRadius: theme.radius.xl,
        backgroundColor:
          `/${item.urlLink}` === pathRef
            ? theme.colorScheme === 'dark'
              ? theme.colors.dark[4]
              : theme.colors.primaryBlue[1]
            : '',
        fontSize: theme.fontSizes.xs,
        fontWeight: 'bold',
        '&:hover': {
          backgroundColor:
            `/${item.urlLink}` === pathRef
              ? theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[4]
              : theme.colorScheme === 'dark'
              ? theme.colors.dark[5]
              : theme.colors.gray[2],
        },
        paddingBlock: '5px',
        '@media (max-width: 1200px) and (min-width: 760px)': {
          paddingBlock: '16px',
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
