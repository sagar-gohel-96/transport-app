import { Card as MantineCard, CardProps, Text } from '@mantine/core';

interface CustomeCardProps extends CardProps {}

export const Card = ({ children }: CustomeCardProps) => {
  return (
    <MantineCard shadow="sm" p="lg" radius="md" withBorder sx={{ flex: '1' }}>
      <Text size="sm" color="dimmed">
        {children}
      </Text>
    </MantineCard>
  );
};
