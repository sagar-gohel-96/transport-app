import { Box, SimpleGrid } from '@mantine/core';
import { Card } from '../../components/common';

export const Dashboard = () => {
  return (
    <Box>
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'md' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}
      >
        <Card children={'this is custome card'} />
        <Card children={'this is custome card'} />
        <Card children={'this is custome card'} />
        <Card children={'this is custome card'} />
      </SimpleGrid>
    </Box>
  );
};
