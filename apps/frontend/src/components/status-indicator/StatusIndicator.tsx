import Box from '@mui/material/Box';

interface StatusIndicatorProps {
  isOn: boolean;
}

export const StatusIndicator = ({ isOn }: StatusIndicatorProps) => {
  const color = isOn ? 'lightgreen' : 'red';

  return (
    <Box
      sx={{
        width: '8px',
        height: '8px',
        borderRadius: '20px',
        backgroundColor: color,
        boxShadow: `0 0 4px ${color}`,
      }}
    />
  );
};
