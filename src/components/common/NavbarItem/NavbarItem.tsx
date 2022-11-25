import { Box, NavLink } from "@mantine/core";
import { ReactNode } from "react";

export interface NavbarSubItemType {
  icon: ReactNode;
  label: string;
  path?: string;
}

export interface NavbarItemType {
  icon: ReactNode;
  label: string;
  path?: string;
  rightSection?: ReactNode;
  subItems?: NavbarSubItemType[];
}

export interface NavbarItemProps {
  data: NavbarItemType;
  index: number;
  active: number;
  pathRef: any;
  handleNavbarClick: (item: NavbarItemType, index: number) => void;
}

export const NavbarItem = ({
  data,
  index,
  active,
  pathRef,
  handleNavbarClick,
}: NavbarItemProps) => {
  const { icon, label, subItems, rightSection, path } = data;

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

      {subItems &&
        (console.log("isActive", subItems, pathRef),
        (
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
        ))}
    </Box>
  );
};
