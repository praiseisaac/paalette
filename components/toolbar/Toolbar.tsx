'use client';

import {
  Button, Group,
} from '@mantine/core';
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { IconMenu, IconX } from '@tabler/icons';
import Link from 'next/link';
import styles from './Toolbar.module.css';
import { PaletteView } from './Toolbar.types';

const Toolbar = ({
  setView, view = PaletteView.CRAZY,
}: {
  view?: PaletteView;
  setView?: (view: PaletteView) => void;
}) => {
  const [opened, { close, open }] = useDisclosure(false);
  const { width } = useViewportSize();
  const nextView = view === PaletteView.CLEAN
    ? PaletteView.CRAZY : PaletteView.CLEAN;
  const isLargeScreen = width > 600;

  return (
    <Group
      {
      ...(isLargeScreen && {
        onMouseEnter: open,
        onMouseLeave: close,
      })
    }
      className={styles.mainContainer}
    >
      {
        opened && isLargeScreen ? null : (
          <button
            type="button"
            onClick={opened ? close : open}
            className={styles.hamburgerButton}
          >
            {opened ? <IconX /> : <IconMenu />}
          </button>
        )
      }
      {
      opened ? (
        <Group className={styles.actionsContainer}>
          <Link href="/" className={styles.toolbarButton}>Home</Link>
          {/* <Link href="/editor" className={styles.toolbarButton}>Editor</Link> */}
          {
              (!!view && !!setView) ? (
                <Button
                  onClick={() => setView(nextView)}
                  variant="subtle"
                  className={styles.toolbarButton}
                >
                  <Group className={styles.actionsHamburger}>
                    <div>
                      {nextView}
                    </div>
                  </Group>
                </Button>
              ) : null
          }
        </Group>
      )
        : null
      }
    </Group>
  );
};

export default Toolbar;
