import { Box, Navbar as MantineNavbar } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AB2,
  ApiApp,
  Book2,
  FileReport,
  LayoutDashboard,
  Users,
} from 'tabler-icons-react';
import { NavbarItem, ProfileTab } from '../../common';

interface NavbarProps {
  opened: boolean;
  onCloseNavbar: () => void;
}

export const enum Routes {
  Dashboard = '/',
  PartyDetails = 'party-details',
  CompanyDetails = 'company-details',
  AreaDetails = 'area-details',
  Transaction = 'transaction',
  Reports = 'reports',
  Profile = 'profile',
}

const navbarItemList = [
  {
    iconColor: 'blue',
    text: 'Dashboard',
    icon: <LayoutDashboard />,
    urlLink: Routes.Dashboard,
  },
  {
    iconColor: 'blue',
    text: 'Party Details',
    icon: <Users />,
    urlLink: Routes.PartyDetails,
  },
  {
    iconColor: 'blue',
    text: 'Company Details',
    icon: <ApiApp />,
    urlLink: Routes.CompanyDetails,
  },
  {
    iconColor: 'blue',
    text: 'Area Details',
    icon: <AB2 />,
    urlLink: Routes.AreaDetails,
  },
  {
    iconColor: 'blue',
    text: 'Transaction',
    icon: <Book2 />,
    urlLink: Routes.Transaction,
  },
  {
    iconColor: 'blue',
    text: 'Reports',
    icon: <FileReport />,
    urlLink: Routes.Reports,
  },
];

export const Navbar = ({ opened, onCloseNavbar }: NavbarProps) => {
  const navigate = useNavigate();
  const [itemIndex, setItemIndex] = useState(0);

  return (
    <MantineNavbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
      sx={(theme) => ({
        // background: theme.colorScheme === 'dark' ? theme.colors.gray[9] : '',
      })}
    >
      <MantineNavbar.Section grow mt="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          {navbarItemList.map((item, i) => (
            <NavbarItem
              key={i}
              index={i}
              iconColor={item.iconColor}
              text={item.text}
              icon={item.icon}
              itemIndex={itemIndex}
              onClick={() => {
                navigate(item.urlLink);
                setItemIndex(i);
                onCloseNavbar();
              }}
            />
          ))}
        </Box>
      </MantineNavbar.Section>

      <MantineNavbar.Section mt="md">
        <ProfileTab navigationPath={Routes.Profile} />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};
