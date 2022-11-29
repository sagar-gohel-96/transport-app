import { Box, Navbar as MantineNavbar } from "@mantine/core";
import { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AB2,
  ApiApp,
  Book2,
  ChevronRight,
  FileReport,
  Fingerprint,
  LayoutDashboard,
  Users,
} from "tabler-icons-react";
import { RoutesEnum } from "../../../Routes";
import { NavbarItem, NavbarItemType, ProfileTab } from "../../common";

interface NavbarProps {
  opened: boolean;
  onCloseNavbar: () => void;
}

const data: NavbarItemType[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    path: RoutesEnum.Dashboard,
  },
  { label: "Parties ", icon: <Users />, path: RoutesEnum.PartiesList },
  { label: "Companies", icon: <ApiApp />, path: RoutesEnum.CompaniesList },
  { label: "Areas ", icon: <AB2 />, path: RoutesEnum.AreasList },
  {
    label: "Transaction list",
    icon: <Book2 />,
    path: RoutesEnum.TransactionList,
  },

  {
    icon: <FileReport />,
    label: "Report",
    rightSection: <ChevronRight size={14} strokeWidth={1.5} />,
    path: RoutesEnum.TransactionList,
    subItems: [
      {
        icon: <Fingerprint />,
        label: "Date Wise",
        path: RoutesEnum.DateWiseReports,
      },
      {
        icon: <Fingerprint />,
        label: "Party wise",
        path: RoutesEnum.PartyWiseReports,
      },
    ],
  },
  { icon: <ApiApp />, label: "Companies", path: RoutesEnum.CompaniesList },
];

export const Navbar = ({ opened, onCloseNavbar }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(0);

  const pathRefMemo = useMemo(() => {
    return location.pathname;
  }, [location.pathname]);

  const handleNavbarClick = (item: NavbarItemType, index: number) => {
    navigate(item.path!);
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
          {data.map((item, i) => (
            <NavbarItem
              key={i}
              data={item}
              handleNavbarClick={handleNavbarClick}
              index={i}
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
