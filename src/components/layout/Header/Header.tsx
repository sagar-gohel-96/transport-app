import {
  Burger,
  Group,
  Header as MantineHeader,
  MediaQuery,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { ThemeAction } from '../../common';
import { Activity } from 'tabler-icons-react';

interface HeaderProps {
  opened: boolean;
  onClick: () => void;
}

export const Header = ({ onClick, opened }: HeaderProps) => {
  const theme = useMantineTheme();

  return (
    <MantineHeader height={70} p="md">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Group>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={opened}
              onClick={onClick}
              size="sm"
              color={theme.colors.gray[6]}
            />
          </MediaQuery>
          <Text
            sx={(theme) => ({
              color: theme.colorScheme === 'dark' ? 'white' : 'black',
              fontWeight: 'bolder',
            })}
          >
            <div style={{ display: 'flex', gap: '5px' }}>
              <Activity /> Transport System
            </div>
          </Text>
        </Group>
        <ThemeAction />
      </div>
    </MantineHeader>
  );
};
