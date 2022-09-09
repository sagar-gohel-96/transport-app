import { useState } from 'react';
import { AppShell, useMantineTheme } from '@mantine/core';
import { Footer, Header, Navbar } from '../../components/layout';
import { AppRoutes } from '../../Routes';

export const Home = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[2],
        },
      }}
      navbarOffsetBreakpoint="md"
      asideOffsetBreakpoint="md"
      navbar={<Navbar opened={opened} />}
      footer={<Footer />}
      header={<Header onClick={() => setOpened((o) => !o)} opened={opened} />}
    >
      <AppRoutes />
    </AppShell>
  );
};
