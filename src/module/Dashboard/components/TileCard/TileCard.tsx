import {
  Box,
  Card as MantineCard,
  Group,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { ReactNode } from "react";

interface CardItemType {
  label: string;
  value: number;
  icon: ReactNode;
  iconColor: string;
  duration: string;
}

interface CardProps {
  item: CardItemType;
}

export const TileCard = ({ item }: CardProps) => {
  const { icon, label, value, duration, iconColor } = item;
  return (
    <MantineCard shadow="sm" p="lg" radius="md">
      <div style={{ display: "flex", gap: "12px" }}>
        <Box sx={{ display: "flex" }}>
          <ThemeIcon radius="xl" size="xl" p={4} color={iconColor}>
            {icon}
          </ThemeIcon>
        </Box>

        <Stack spacing={0}>
          <Text weight={600}>{label}</Text>
          <Group spacing={4}>
            <Text size={20} weight={700}>
              {value}
            </Text>
            <Text size="sm" color="dimmed">
              {duration}
            </Text>
          </Group>
        </Stack>
      </div>
    </MantineCard>
  );
};
