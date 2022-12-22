import {
  Avatar,
  Burger,
  Group,
  Header as MantineHeader,
  MediaQuery,
  Menu,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { ThemeAction } from '../../common';
import { Lock, Logout, User } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store';
import { useAuth, useCompanies, useLocalStorage } from '../../../hooks';
import { config } from '../../../utils';
import { authAction } from '../../../store/auth-slice';
import { RoutesMapping } from '../../../Routes';
import { TrukIcon } from '../../../assets/icons';
import { useEffect } from 'react';

interface HeaderProps {
  opened: boolean;
  onOpenNavbar: () => void;
  onCloseNavbar: () => void;
}

export const Header = ({
  onOpenNavbar,
  onCloseNavbar,
  opened,
}: HeaderProps) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setLocalStorageItem: setUser } = useLocalStorage(
    config.userLocalStorageKey as string
  );

  const { user } = useAuth();
  const { getCompanies } = useCompanies(user! && user.companyId);

  useEffect(() => {
    getCompanies.refetch();
  }, [user, getCompanies]);

  const onLogout = () => {
    if (user) {
      setUser('');
      dispatch(
        authAction.setUser({ initialized: true, user: null, token: null })
      );
      navigate('/');
    }
  };

  function getFirstLetters(str: string) {
    const firstLetters = str
      .split(' ')
      .map((word) => word[0])
      .join('');

    return firstLetters;
  }

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
              onClick={opened ? onCloseNavbar : onOpenNavbar}
              size="sm"
              color={theme.colors.gray[6]}
            />
          </MediaQuery>
          <UnstyledButton
            onClick={() => navigate(`/${RoutesMapping.Dashboard}`)}
          >
            <Group>
              <TrukIcon height={40} width={40} />
              <Text weight={700} size="xl">
                {getCompanies.data && getCompanies.data.companyName}
              </Text>
            </Group>
          </UnstyledButton>
        </Group>
        <Group>
          <ThemeAction />
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Avatar color="blue" radius="xl">
                <Text transform="uppercase">
                  {getFirstLetters(user?.name!)}
                </Text>
              </Avatar>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>{user?.name}</Menu.Label>
              <Menu.Item
                icon={<User size={14} />}
                onClick={() => navigate(RoutesMapping.Profile)}
              >
                Profile
              </Menu.Item>
              <Menu.Item icon={<Lock size={14} />}>Change Password</Menu.Item>
              <Menu.Item icon={<Logout size={14} />} onClick={onLogout}>
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </div>
    </MantineHeader>
  );
};
