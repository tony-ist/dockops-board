import Box from '@mui/material/Box';
import * as React from 'react';
import { BoxProps } from '@mui/material/Box/Box';
import { useTheme } from '@mui/material/styles';

export const ScrollableBox = (props: BoxProps) => {
  const theme = useTheme();
  return (
    <Box
      {...props}
      sx={{
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '7px',
        },
        '&::-webkit-scrollbar-track': {
          borderRadius: '5px',
          background: theme.palette.grey.A400,
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '5px',
          background: theme.palette.primary.main,
        },
        ...props.sx,
      }}
    />
  );
};
