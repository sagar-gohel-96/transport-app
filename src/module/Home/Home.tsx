import { useState } from 'react';
import { AppShell, useMantineTheme } from '@mantine/core';
import { Footer, Header, Navbar } from '../../components/layout';
import { AppRoutes } from '../../Routes';

export const Home = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const openNavbar = () => {
    setOpened(true);
  };

  const closeNavbar = () => {
    setOpened(false);
  };

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
      navbar={<Navbar opened={opened} onCloseNavbar={closeNavbar} />}
      footer={<Footer />}
      header={
        <Header
          onOpenNavbar={openNavbar}
          onCloseNavbar={closeNavbar}
          opened={opened}
        />
      }
    >
      <AppRoutes />
    </AppShell>
  );
};
