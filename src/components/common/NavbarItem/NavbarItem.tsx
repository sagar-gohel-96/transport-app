import { Box, NavLink } from "@mantine/core";
import { ReactNode } from "react";

interface SubItemType {
  icon: ReactNode;
  label: string;
  path?: string;
}

export interface NavbarItemType {
  icon: ReactNode;
  label: string;
  path?: string;
  subItems?: SubItemType[];
  rightSection?: ReactNode;
}

interface NavbarItemProps {
  data: NavbarItemType;
  pathRef: any;
  index: number;
  handleNavbarClick: (item: NavbarItemType, index: number) => void;
}

export const NavbarItem = ({
  data,
  pathRef,
  index,
  handleNavbarClick,
}: NavbarItemProps) => {
  const { icon, label, subItems, path, rightSection } = data;

  return (
    <Box sx={{}}>
      {!subItems && (
        <NavLink
          py="sm"
          key={index}
          active={`/${path}` === pathRef}
          label={label}
          rightSection={rightSection}
          icon={icon}
          onClick={() => handleNavbarClick(data, index)}
          sx={{ borderRadius: 8 }}
        />
      )}

      {subItems && (
        <NavLink label={label} icon={icon}>
          {subItems.map((sub, i) => (
            <NavLink
              key={sub.label}
              active={`/${sub.path}` === pathRef}
              label={sub.label}
              icon={sub.icon}
              onClick={() => handleNavbarClick(sub, i)}
              sx={{ borderRadius: 8 }}
            />
          ))}
        </NavLink>
      )}
    </Box>
  );
};
