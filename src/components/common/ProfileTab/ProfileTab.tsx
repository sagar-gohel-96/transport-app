import { Box, Image, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'tabler-icons-react';

interface ProfileTabProps {
  navigationPath: string;
}

export const ProfileTab = ({ navigationPath }: ProfileTabProps) => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => {
        navigate(navigationPath);
      }}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2],
        borderTopRightRadius: theme.radius.xl,
        borderBottomRightRadius: theme.radius.xl,
        padding: theme.spacing.xs,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[4]
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
          textDecoration: 'none',
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
            sx={{
              '@media (max-width: 1200px) and (min-width: 760px)': {
                display: 'none',
              },
            }}
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
                // '@media (max-width: 1200px) and (min-width: 760px)': {
                //   display: 'none',
                // },
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
