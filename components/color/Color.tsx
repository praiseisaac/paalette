'use client';

import {
  ActionIcon, CopyButton, Group, Text,
} from '@mantine/core';
import { useDisclosure, useHover } from '@mantine/hooks';
import {
  IconBookmark, IconCheck, IconCopy, IconDots,
} from '@tabler/icons';
import { useMemo } from 'react';
import { calculateContrast, convertHexToRGB } from '../../helpers/colors.helpers';
import { PaletteView } from '../toolbar/Toolbar.types';
import styles from './Color.module.css';

const Color = ({ color, view }: { color: string; view: PaletteView; }) => {
  const { ref, hovered } = useHover();
  const [opened, { close, open }] = useDisclosure(false);

  const height = useMemo(() => (view === PaletteView.CLEAN
    ? '300px' : `${Math.random() * 300 + 200}px`), [view]);

  const textColor = useMemo(() => {
    const rgb = convertHexToRGB(color);

    if (!rgb) return 'white';
    const ratio = calculateContrast([255, 255, 255], [rgb?.r, rgb?.g, rgb?.b]);

    return ratio < 3 ? 'black' : 'white';
  }, [color]);

  const toolbarButtonColor = {
    ':hover': {
      background: 'rgba(255, 255, 255, 0.3)',
    },
  };

  return (
    <Group
      ref={ref}
      onMouseLeave={close}
      className={styles.colorCardItem}
      style={{
        backgroundColor: color,
        minHeight: height,
      }}
    >
      {
      hovered || opened ? (
        <Group className={styles.toolbar}>
          <Group className={styles.colorText}>
            <Text sx={{ fontWeight: 600, color: textColor }}>
              {color.toUpperCase()}
            </Text>
          </Group>
          <Group className={styles.buttonsContainer}>
            <CopyButton value={color.toUpperCase()}>
              {({ copied, copy }) => (
                <ActionIcon
                  sx={toolbarButtonColor}
                  onClick={copy}
                  className={styles.actionButton}
                >
                  {copied ? <IconCheck color={textColor} /> : <IconCopy color={textColor} />}
                </ActionIcon>
              )}
            </CopyButton>
            <ActionIcon
              sx={toolbarButtonColor}
              className={styles.actionButton}
            >
              <IconBookmark color={textColor} />
            </ActionIcon>
            <ActionIcon
              sx={toolbarButtonColor}
              onClick={open}
              className={styles.actionButton}
            >
              <IconDots color={textColor} />
            </ActionIcon>
          </Group>
          <Group sx={{
            height: opened ? '50px' : '0px',
            transition: 'all 0.5s',
            overflow: 'hidden',
            display: 'grid',
            justifyItems: 'flex-start',
            padding: 0,
          }}
          >
            <ActionIcon
              sx={toolbarButtonColor}
              onClick={open}
              className={styles.actionButton}
            >
              <IconDots color={textColor} />
            </ActionIcon>
          </Group>
        </Group>
      ) : null
    }
    </Group>
  );
};

export default Color;
