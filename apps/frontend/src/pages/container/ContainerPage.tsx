import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { containersSelectors } from '../../features/container/containersSlice';
import { store } from '../../store/store';
import React, { useEffect } from 'react';
import { fetchContainerByIdThunk } from '../../features/container/getContainerSlice';
import { Box, Button } from '@mui/material';
import { LogsViewer } from '../../components/logs-viewer/LogsViewer';
import { webSocketActions } from '../../features/web-socket/webSocketSlice';
import { startContainerThunk } from '../../features/container/startContainerSlice';
import { stopContainerThunk } from '../../features/container/stopContainerSlice';

export const ContainerPage = () => {
  const params = useParams<{ id: string }>();
  const dbContainerId = params.id as string;
  const dispatch = useAppDispatch();
  const container = containersSelectors.selectById(store.getState(), dbContainerId);
  const status = useAppSelector((state) => state.getContainer.status);
  const logs = useAppSelector((state) => state.containerLogs.messages);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContainerByIdThunk({ dbContainerId }));
    }
  }, [dispatch, status]);

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
    dispatch(webSocketActions.containerLogsSubscribeRequest({ dbContainerId, tail: 100 }));
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
      {logs.length > 0 && <LogsViewer logs={logs} />}
    </>
  );
};
