import { ContainerList } from '../../components/container-list/ContainerList';
import { useAppDispatch } from '../../store/hooks';
import { WebSocketMessages } from '../../components/web-socket-messages/WebSocketMessages';
import { Button } from '@mui/material';
import { WebSocketRequestEvents } from 'common-src';
import { DashboardLayout } from '../../layouts/dashboard/dashboard';
import { containerLogsRequest, createContainerRequest } from '../../features/web-socket/webSocketActions';

export const RootPage = () => {
  const dispatch = useAppDispatch();

  function createContainer(containerName: string, hostPort: string) {
    dispatch(createContainerRequest({
      containerName,
      githubURL: 'https://github.com/mendhak/docker-http-https-echo/archive/refs/heads/master.zip',
      dockerfileName: 'Dockerfile',
      containerPort: '8080',
      hostPort,
    }));
  }

  function subscribeToLogs(dbContainerId: number) {
    dispatch(containerLogsRequest({
      event: WebSocketRequestEvents.ContainerLogsSubscribe,
      dbContainerId,
    }));
  }

  return (
    <>
      <DashboardLayout>
        <Button variant="contained" onClick={() => createContainer('temp-echo-server', '8080')}>
          Deploy Echo Server on port 8080!
        </Button>
        <Button variant="contained" onClick={() => subscribeToLogs(11)}>
          Receive logs from 8080
        </Button>
        <ContainerList></ContainerList>
        <WebSocketMessages></WebSocketMessages>
      </DashboardLayout>
    </>
  );
};
