import { Box, Stack, ThemeIcon, Text } from '@mantine/core';
import { memo } from 'react';
import { emptyStates, EmptyStatesList } from './utils/emptyStates';

interface EmptyStateProps {
  name?: EmptyStatesList;
  isApiDataFound: boolean;
}

export const EmptyState = memo((props: EmptyStateProps) => {
  const emptyStateName = props.isApiDataFound
    ? props.name ?? 'noData'
    : 'noDataLoad';

  const { icon, title, description } = emptyStates[emptyStateName];

  return (
    <Stack justify="center" align="center" py={48}>
      <ThemeIcon variant="light" size={150}>
        {icon}
      </ThemeIcon>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 12,
        }}
      >
        <Text size="xl" weight={700}>
          {title}
        </Text>
        <Text size="sm">{description}</Text>
      </Box>
    </Stack>
  );
});
