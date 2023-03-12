import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { containersSelectors } from '../../features/container/containersSlice';
import React, { useEffect } from 'react';
import { fetchContainerByIdThunk } from '../../features/container/getContainerSlice';
import { Box, Button } from '@mui/material';
import { LogsViewer } from '../../components/logs-viewer/LogsViewer';
import { containerLogsActions } from '../../features/container/containerLogsSlice';
import { ContainerStatusIndicator } from '../../components/status-indicator/ContainerStatusIndicator';
import styles from './ContainerPage.module.css';
import { startContainerThunk, stopContainerThunk } from '../../features/container/updateContainerSlice';

export const ContainerPage = () => {
  const params = useParams<{ id: string }>();
  const dbContainerId = parseInt(params.id as string);
  const dispatch = useAppDispatch();
  const container = useAppSelector((state) => containersSelectors.selectById(state, dbContainerId));
  const containerLogs = useAppSelector((state) => state.containerLogs.messages);
  const updateError = useAppSelector((state) => state.updateContainer.error);

  useEffect(() => {
    dispatch(containerLogsActions.clear());
    dispatch(fetchContainerByIdThunk({ dbContainerId }));
  }, [dispatch, dbContainerId]);

  if (!container) {
    return <div>Loading...</div>;
  }

  function startContainer() {
    dispatch(startContainerThunk({ dbContainerId }));
  }

  function stopContainer() {
    dispatch(stopContainerThunk({ dbContainerId }));
  }

  function subscribeToLogs() {
    dispatch(containerLogsActions.wsContainerLogsSubscribeRequest({ dbContainerId, tail: 100 }));
  }

  return (
    <>
      <Button variant='contained' onClick={startContainer}>
        Start Container
      </Button>
      <Button variant='contained' onClick={stopContainer}>
        Stop Container
      </Button>
      <Button variant='contained' onClick={subscribeToLogs}>
        Subscribe to Logs
      </Button>
      <Box>{container.id}</Box>
      <Box>{container.image}</Box>
      <Box>{container.dockerName}</Box>
      <Box>{container.buildStatus}</Box>
      <Box>{container.dockerId}</Box>
      <Box>{container.dockerState}</Box>
      <Box>{container.createdAt}</Box>
      <ContainerStatusIndicator container={container} />
      {updateError && <Box className={styles.error}>Update container error {updateError}</Box>}
      {containerLogs.length > 0 && <LogsViewer logs={containerLogs} />}
    </>
  );
};
