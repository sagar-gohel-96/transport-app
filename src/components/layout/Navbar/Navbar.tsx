import { Navbar as MantineNavbar } from '@mantine/core';
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
}

export const enum Routes {
  Dashboard = '/',
  PartyMaster = 'party-master',
  CompanyMaster = 'company-master',
  AreaMaster = 'area-master',
  Transaction = 'transaction',
  Reports = 'reports',
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
    text: 'Party Master',
    icon: <Users />,
    urlLink: Routes.PartyMaster,
  },
  {
    iconColor: 'blue',
    text: 'Company Master',
    icon: <ApiApp />,
    urlLink: Routes.CompanyMaster,
  },
  {
    iconColor: 'blue',
    text: 'Area Master',
    icon: <AB2 />,
    urlLink: Routes.AreaMaster,
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

export const Navbar = ({ opened }: NavbarProps) => {
  const navigate = useNavigate();
  const [itemIndex, setItemIndex] = useState(0);

  return (
    <MantineNavbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <MantineNavbar.Section grow mt="md">
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
            }}
          />
        ))}
      </MantineNavbar.Section>

      <MantineNavbar.Section mt="md">
        <ProfileTab />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};
