import { Container } from '@mui/material';
import styles from './CreateContainerPage.module.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { LogsViewer } from '../../components/logs-viewer/LogsViewer';
import { CreateContainerForm } from './CreateContainerForm';
import { useEffect } from 'react';
import { buildImageLogsActions } from '../../features/container/buildImageLogsSlice';
import { NextButton } from './NextButton';
import { createContainerActions } from '../../features/container/createContainerSlice';

export const CreateContainerPage = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const buildLogs = useAppSelector((state) => state.buildLogs.messages);
  // const buildLogs = [
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  //   { text: 'qweerrreteterter ert ret re tre terte rt' },
  // ];
  const createdDbContainerId = useAppSelector((state) => state.createContainer.dbContainerId);

  useEffect(() => {
    dispatch(createContainerActions.clear());
    dispatch(buildImageLogsActions.clear());
  }, [dispatch]);

  return (
    <Container
      className={styles.content}
      maxWidth='xl'
      sx={{
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box>
        <Typography variant='h4'>Create New Container</Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ mb: 2 }}>
        <CreateContainerForm />
        {buildLogs.length > 0 && <LogsViewer logs={buildLogs} />}
      </Box>
      <NextButton dbContainerId={createdDbContainerId} />
    </Container>
  );
};
