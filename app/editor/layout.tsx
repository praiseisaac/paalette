'use client';

import {
  Navbar, Header, AppShell,
} from '@mantine/core';
import Toolbar from '../../components/toolbar/Toolbar';
import styles from './page.module.css';

const Layout = ({ children }: {
  children: React.ReactNode
}) => (
  <AppShell
    padding="md"
    navbar={(
      <Navbar
        width={{ base: 300 }}
        height="100vh"
        p="xs"
        sx={(theme) => ({
          backgroundColor: `${theme.colors.gray[0]}`,
          border: 'none',
          '@media (prefers-color-scheme: dark) ': {
            backgroundColor: theme.colors.dark[8],
            borderRight: `1px solid ${theme.colors.gray[2]}`,
          },
        })}
      >
        {/* Navbar content */}
      </Navbar>
    )}
    header={(
      <Header
        height={70}
        p="xs"
        sx={(theme) => ({
          backgroundColor: theme.colors.dark[8],
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: 'none',
          '@media (prefers-color-scheme: dark) ': {
            backgroundColor: theme.colors.dark[8],
            borderBottom: `1px solid ${theme.colors.gray[2]}`,
          },
        })}
      >
        <span className={styles.title}>Editor</span>
        <Toolbar />
      </Header>
    )}
    styles={(theme) => ({
      main: {
        backgroundColor: theme.colors.gray[3],
        paddingLeft: 'calc(var(--mantine-navbar-width, 0px))',
        paddingRight: '0px',
        paddingBottom: '0px',
        paddingTop: 'calc(var(--mantine-header-height, 0px))',
        '> div': {
          height: '100%',
          width: '100%',
        },
      },
    })}
  >
    {children}
  </AppShell>
);

export default Layout;
