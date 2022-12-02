import { Card as MantineCard, Group, Stack, Text } from '@mantine/core';
import { duration } from 'moment';
import { ReactNode } from 'react';
import { User } from 'tabler-icons-react';

interface CardProps {
  lable: string;
  value: number;
  icon: ReactNode;
  duration: string;
}

export const Card = ({ icon, lable, value, duration }: CardProps) => {
  return (
    <MantineCard shadow="sm" p="lg" radius="md">
      <Group spacing={16}>
        {icon}
        <Stack spacing={0}>
          <Text size="xl"  >
            {value}
          </Text>

          <Text  >
            {lable}
          </Text>
          <Text size="sm" color="dimmed">
            {duration}
          </Text>
        </Stack>
      </Group>
    </MantineCard>
  );
};
