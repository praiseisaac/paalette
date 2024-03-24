/* eslint-disable react/no-array-index-key */

'use client';

import { useViewportSize } from '@mantine/hooks';
import { Group, MantineProvider } from '@mantine/core';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 } from 'uuid';
import styles from './Palette.module.css';
import Color from '../color/Color';
import Toolbar from '../toolbar/Toolbar';
import { PaletteView } from '../toolbar/Toolbar.types';
import { generateHex } from '../../helpers/colors.helpers';
import theme from '../../helpers/theme.helper';

const generateMore = ({
  columnCount, palette, setPalette, view,
}:
{
  columnCount: number,
  view: any,
  palette: (JSX.Element[])[],
  setPalette: any
}, w?: number, newPalette?: (JSX.Element[])[]) => {
  if (!columnCount && !w) return;
  // eslint-disable-next-line no-bitwise
  if (!!palette.length && !newPalette) {
    setPalette(
      palette
      // eslint-disable-next-line no-bitwise
        .map((p) => p.concat(Array(2).fill('').map(() => <Color view={view} key={v4()} color={generateHex()} />))),
    );
    return;
  }
  setPalette(
    Array(w ?? columnCount).fill('').map(() => Array(15).fill('').map(() => <Color view={view} key={v4()} color={generateHex()} />), 0),
  );
};

const Palette = () => {
  const [palette, setPalette] = useState<(JSX.Element[])[]>([]);
  const { width } = useViewportSize();
  const [columnCount, setColumnCount] = useState<number>(8);
  const [view, setView] = useState(PaletteView.CRAZY);

  useEffect(() => {
    generateMore({
      columnCount, palette, setPalette, view,
    }, undefined, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  useEffect(() => {
    const w = Math.round(width / 200);
    if (!palette.length) {
      generateMore({
        columnCount, palette, setPalette, view,
      }, w, undefined);
      setColumnCount(w);
      return;
    }
    if (!columnCount) return;
    let res: (JSX.Element[])[] = Array(w).fill('').map(() => []);

    res = Array(w).fill('').map(() => []);
    setColumnCount(w);
    palette.flat().forEach((p, i) => {
      res[i % w].push(p);
    });
    setPalette(res);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <MantineProvider
      theme={theme}
    >
      <div className={styles.mainContainer}>
        <div className={styles.paletteContainer}>
          <InfiniteScroll
            dataLength={palette[0]?.length ?? palette?.length}
            next={() => generateMore({
              columnCount, palette, setPalette, view,
            })}
            hasMore
            loader={<h4>Loading...</h4>}
            style={{
              overflowX: 'hidden',
            }}
          >
            <Group className={styles.toolbarContainer}>
              <Toolbar view={view} setView={setView} />
            </Group>
            <div style={{
              width: '100vw',
              gap: '0px',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
            >
              {palette.map((column, i) => (
                <Group
                  sx={{
                    width: `calc(1/${columnCount} * 100vw)`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px',
                  }}
                  key={i}
                >
                  {column.map((color) => color)}
                </Group>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </MantineProvider>
  );
};

export default Palette;
