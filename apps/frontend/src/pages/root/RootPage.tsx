import { ContainerList } from '../../components/container-list/ContainerList';
import { useAppDispatch } from '../../store/hooks';
import { WebSocketMessages } from '../../components/web-socket-messages/WebSocketMessages';
import { Button } from '@mui/material';
import { createContainerThunk } from '../../features/container/createContainerSlice';
import { webSocketActions } from '../../features/web-socket/webSocketSlice';
import { WebSocketRequestEvents } from 'common-src';
import { DashboardLayout } from '../../layouts/dashboard/dashboard';
import { createContainerRequest } from '../../features/container/containersSlice';

export const RootPage = () => {
  const dispatch = useAppDispatch();

  function dispatchCreateContainer(containerName: string, hostPort: string) {
    dispatch(createContainerRequest({
      containerName,
      githubURL: 'https://github.com/mendhak/docker-http-https-echo/archive/refs/heads/master.zip',
      dockerfileName: 'Dockerfile',
      containerPort: '8080',
      hostPort,
    }));
  }

  // function dispatchStartContainer(dbContainerId: number) {
    // dispatch();
    // dispatch(
    //   createContainerThunk({
    //     containerName,
    //     githubURL: 'https://github.com/mendhak/docker-http-https-echo/archive/refs/heads/master.zip',
    //     dockerfileName: 'Dockerfile',
    //     containerPort: '8080',
    //     hostPort,
    //   })
    // );
  // }

  // function emit(dbContainerId: number) {
  //   dispatch(webSocketActions.sendMessage({ event: WebSocketRequestEvents.ContainerLogsRequest, dbContainerId }));
  // }

  return (
    <>
      <DashboardLayout>
        <Button variant="contained" onClick={() => dispatchCreateContainer('temp-echo-server', '8080')}>
          Deploy Echo Server on port 8080!
        </Button>
        <ContainerList></ContainerList>
        <WebSocketMessages></WebSocketMessages>
      </DashboardLayout>
    </>
  );
};

/*

        <Button variant="contained" onClick={() => dispatchCreateContainer('temp-echo-server', '8081')}>
          Deploy Echo Server on port 8081!
        </Button>
        <Button variant="contained" onClick={() => dispatchCreateContainer('temp-echo-server', '8080')}>
          Start Echo Server on port 8080
        </Button>
        <Button variant="contained" onClick={() => dispatchCreateContainer('temp-echo-server', '8080')}>
          Start Echo Server on port 8081
        </Button>
        <Button variant="contained" onClick={() => emit(3)}>
          Receive logs from 8080
        </Button>
        <Button variant="contained" onClick={() => emit(5)}>
          Receive logs from 8081
        </Button>

*/
