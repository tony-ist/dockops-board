import Box from '@mui/material/Box';
import * as React from 'react';
import { BoxProps } from '@mui/material/Box/Box';
import styles from './ScrollableBox.module.css';
import { useTheme } from '@mui/material/styles';

export const ScrollableBox = (props: BoxProps) => {
  const theme = useTheme();
  return (
    <Box
      className={styles.scrollableBox}
      {...props}
      sx={{
        '&::-webkit-scrollbar-thumb': {
          background: theme.palette.primary.main,
        },
        ...props.sx,
      }}
    />
  );
};
