import { ContainerList } from '../../components/container-list/ContainerList';
import { useAppDispatch } from '../../store/hooks';
import { WebSocketMessages } from '../../components/web-socket-messages/WebSocketMessages';
import { Button } from '@mui/material';
import { createContainerThunk } from '../../features/container-new/createContainerSlice';
import { webSocketActions } from '../../features/web-socket/webSocketSlice';
import { WebSocketRequest } from 'common-src';
import { DashboardLayout } from '../../layouts/dashboard/dashboard';

export const RootPage = () => {
  const dispatch = useAppDispatch();

  function dispatchCreateContainer() {
    dispatch(
      createContainerThunk({
        containerName: 'temp-echo-server',
        githubURL: 'https://github.com/mendhak/docker-http-https-echo/archive/refs/heads/master.zip',
        dockerfileName: 'Dockerfile',
        containerPort: '8080',
        hostPort: '8080',
      })
    );
  }

  function emit(dbContainerId: number) {
    dispatch(webSocketActions.sendMessage({ event: WebSocketRequest.ContainerLogsRequest, dbContainerId }));
  }

  return (
    <>
      <DashboardLayout>
        <Button variant="contained" onClick={dispatchCreateContainer}>
          Deploy Echo Server!
        </Button>
        <Button variant="contained" onClick={() => emit(3)}>
          Emit 3
        </Button>
        <Button variant="contained" onClick={() => emit(5)}>
          Emit 5
        </Button>
        <ContainerList></ContainerList>
        <WebSocketMessages></WebSocketMessages>
      </DashboardLayout>
    </>
  );
};
