'use client';

import { Group } from '@mantine/core';
import { useMouse } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import Previewer from './components/Previewer/Previewer';
import Properties from './components/Properties/Properties';
import styles from './Editor.module.css';

const Editor = () => {
  const [moving, setMoving] = useState(false);
  const [value, setValue] = useState(300);
  const { ref, y } = useMouse();

  useEffect(() => {
    if (!moving) return;
    setValue(y);
  }, [y, moving]);

  return (
    <Group
      ref={ref}
      onMouseUp={() => setMoving(false)}
      className={styles.mainContainer}
    >
      <Group
        sx={{
          backgroundColor: 'green',
          width: '100%',
          height: `calc(${value}px)`,
          maxHeight: '80%',
        }}
      >
        <Previewer />
      </Group>
      {/* Thumb */}
      <Group
        onMouseDown={() => setMoving(true)}
        onMouseUp={() => setMoving(false)}
        style={{
          left: 0,
          height: 5,
          cursor: 'ns-resize',
          width: '100%',
          backgroundColor: 'black',
        }}
      />
      {/* Filled bar */}
      <Group
        onMouseUp={() => setMoving(false)}
        sx={{
          bottom: 0,
          width: '100%',
          backgroundColor: 'gray',
          flex: 1,
        }}
      >
        <Properties />
      </Group>
    </Group>
  );
};

export default Editor;
