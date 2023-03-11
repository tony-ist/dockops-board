import { ScrollableBox } from '../scrollable-box/ScrollableBox';
import Box from '@mui/material/Box';
import { Switch } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Log } from 'common-src';
import styles from './LogsViewer.module.css';

interface LogsViewerProps {
  logs: Array<Log>;
}

export const LogsViewer = (props: LogsViewerProps) => {
  const [autoscrollEnabled, setAutoscrollEnabled] = useState(true);
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const theme = useTheme();
  const { logs } = props;

  useEffect(() => {
    if (autoscrollEnabled) {
      scrollRef.current?.scrollIntoView();
    }
  }, [logs, autoscrollEnabled]);

  return (
    <Box position='relative'>
      <ScrollableBox className={styles.logs}>
        <Box
          onClick={() => setAutoscrollEnabled(!autoscrollEnabled)}
          className={styles.autoscrollButton}
          sx={{
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.primary.main}`,
          }}
        >
          <Switch checked={autoscrollEnabled} />
          <Typography variant='body2' component='span' mr={2}>
            Autoscroll
          </Typography>
        </Box>
        {logs.map((row, index) => (
          <p key={index.toString()} className={styles.logsLine}>{`${row.text}`}</p>
        ))}
        <div ref={scrollRef} />
      </ScrollableBox>
    </Box>
  );
};
