import { Box, Navbar as MantineNavbar } from "@mantine/core";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { NavbarItem, ProfileTab } from "../../common";

interface NavbarProps {
  opened: boolean;
  onCloseNavbar: () => void;
}

const data = [
  {
    icon: <LayoutDashboard />,
    label: "Dashboard",
    path: RoutesEnum.Dashboard,
  },
  {
    icon: <Users />,
    label: "Parties",
    path: RoutesEnum.PartiesList,
  },
  {
    icon: <AB2 />,
    label: "Areas",
    path: RoutesEnum.AreasList,
  },
  {
    icon: <Book2 />,
    label: "Transactions",
    path: RoutesEnum.TransactionList,
  },
  {
    icon: <FileReport />,
    label: "Report",
    rightSection: <ChevronRight size={14} strokeWidth={1.5} />,
    subItems: [
      {
        icon: <Fingerprint />,
        label: "Date Wise",
        path: RoutesEnum.DateWiseReports,
      },
      {
        icon: <Fingerprint />,
        label: "party wise",
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

  const handleNavbarClick = (item: any, index: number) => {
    navigate(item.path);
    setActive(index);
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
          {data.map((item, index) => (
            <NavbarItem
              data={item}
              index={index}
              key={index}
              active={active}
              handleNavbarClick={handleNavbarClick}
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
