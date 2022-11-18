import { Box, Navbar as MantineNavbar } from "@mantine/core";
import { ReactNode, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AB2,
  ApiApp,
  Book2,
  FileReport,
  LayoutDashboard,
  Users,
} from "tabler-icons-react";
import { RoutesEnum } from "../../../Routes";
import { NavbarItem, ProfileTab } from "../../common";

interface NavbarProps {
  opened: boolean;
  onCloseNavbar: () => void;
}

export interface NavbarItemListType {
  iconColor: string;
  icon: ReactNode;
  text: string;
  urlLink: string;
}

const navbarItemList = [
  {
    iconColor: "blue",
    text: "Dashboard",
    icon: <LayoutDashboard />,
    urlLink: RoutesEnum.Dashboard,
  },
  {
    iconColor: "blue",
    text: "Parties ",
    icon: <Users />,
    urlLink: RoutesEnum.PartiesList,
  },
  {
    iconColor: "blue",
    text: "Companies",
    icon: <ApiApp />,
    urlLink: RoutesEnum.CompaniesList,
  },
  {
    iconColor: "blue",
    text: "Areas ",
    icon: <AB2 />,
    urlLink: RoutesEnum.AreasList,
  },
  {
    iconColor: "blue",
    text: "Transaction list",
    icon: <Book2 />,
    urlLink: RoutesEnum.TransactionList,
  },
  {
    iconColor: "blue",
    text: "Reports",
    icon: <FileReport />,
    urlLink: RoutesEnum.Reports,
  },
];

export const Navbar = ({ opened, onCloseNavbar }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathRefMemo = useMemo(() => {
    return location.pathname;
  }, [location.pathname]);

  const handleMenuClick = (item: NavbarItemListType) => {
    navigate(item.urlLink);
    onCloseNavbar();
  };

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
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {navbarItemList.map((item, i) => (
            <NavbarItem
              key={i}
              item={item}
              onClick={() => handleMenuClick(item)}
              pathRef={pathRefMemo}
            />
          ))}
        </Box>
      </MantineNavbar.Section>

      <MantineNavbar.Section mt="md">
        <ProfileTab navigationPath={RoutesEnum.Profile} />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};
