import { Box } from '@mui/material';
import { BoxProps } from '@mui/material';
import { useTheme } from '@mui/material';

export const ScrollableBox = (props: BoxProps) => {
  const theme = useTheme();
  return (
    <Box
      {...props}
      sx={{
        paddingRight: '10px',
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
