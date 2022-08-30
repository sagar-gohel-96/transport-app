import { Box, Image, Text } from '@mantine/core';
import { ArrowRight } from 'tabler-icons-react';

export const ProfileTab = () => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[5]
            : theme.colors.gray[2],
        borderRadius: theme.radius.md,
        padding: theme.spacing.xs,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[5]
              : theme.colors.gray[2],
        },
      })}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Image
            width={48}
            height={48}
            radius="xl"
            src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            alt="Random unsplash image"
          />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text sx={(theme) => ({ fontWeight: 'bolder' })}>User Name</Text>
            <Text
              sx={(theme) => ({
                fontSize: theme.fontSizes.sm,
                '@media (max-width: 1200px) and (min-width: 760px)': {
                  display: 'none',
                },
              })}
            >
              text@gmail.com
            </Text>
          </div>
        </div>
        <ArrowRight />
      </div>
    </Box>
  );
};
