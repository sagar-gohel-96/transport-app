import { Box, Navbar as MantineNavbar } from "@mantine/core";
import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AB2,
  ApiApp,
  Book2,
  Calendar,
  ChevronRight,
  FileReport,
  LayoutDashboard,
  User,
  Users,
} from "tabler-icons-react";
import { RoutesMapping } from "../../../Routes";
import { NavbarItem, NavbarItemType, ProfileTab } from "../../common";

interface NavbarProps {
  opened: boolean;
  onCloseNavbar: () => void;
}

const data: NavbarItemType[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    path: RoutesMapping.Dashboard,
  },
  { label: "Parties ", icon: <Users />, path: RoutesMapping.PartiesList },

  { label: "Areas ", icon: <AB2 />, path: RoutesMapping.AreasList },
  {
    label: "Transaction list",
    icon: <Book2 />,
    path: RoutesMapping.TransactionList,
  },

  {
    icon: <FileReport />,
    label: "Report",
    rightSection: <ChevronRight size={14} strokeWidth={1.5} />,
    path: RoutesMapping.TransactionList,
    subItems: [
      {
        icon: <Calendar />,
        label: "Date Wise Report",
        path: RoutesMapping.DateWiseReports,
      },
      {
        icon: <User />,
        label: "Party Wise Report",
        path: RoutesMapping.PartyWiseReports,
      },
    ],
  },
  {
    label: "Companies Profile",
    icon: <ApiApp />,
    path: RoutesMapping.CompaniesProfile,
  },
];

export const Navbar = ({ opened, onCloseNavbar }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

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
        <ProfileTab navigationPath={RoutesMapping.Profile} />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};
