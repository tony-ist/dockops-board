import { ContainerList } from '../../components/container-list/ContainerList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Button, Container } from '@mui/material';
import { DashboardLayout } from '../../layouts/dashboard/dashboard';
import { containerLogsRequest, createContainerRequest } from '../../features/web-socket/webSocketActions';
import { startContainerThunk } from '../../features/container/startContainerSlice';

export const RootPage = () => {
  const dispatch = useAppDispatch();
  const dbCreatedContainerId = useAppSelector((state) => state.createContainer.dbContainerId);

  function createContainer(containerName: string, hostPort: string) {
    dispatch(
      createContainerRequest({
        containerName,
        githubURL: 'https://github.com/mendhak/docker-http-https-echo/archive/refs/heads/master.zip',
        dockerfileName: 'Dockerfile',
        containerPort: '8080',
        hostPort,
      })
    );
  }

  function startContainer(dbContainerId: number) {
    dispatch(
      startContainerThunk({
        dbContainerId,
      })
    );
  }

  function subscribeToLogs(dbContainerId: number) {
    dispatch(
      containerLogsRequest({
        dbContainerId,
      })
    );
  }

  return (
    <DashboardLayout>
      <Container
        maxWidth={'xl'}
        sx={{
          display: 'flex',
          justifyContent: 'right',
          '& > button': {
            marginLeft: 2,
          },
        }}
      >
        <Button variant="contained" onClick={() => createContainer('temp-echo-server', '8080')}>
          Deploy Echo Server on port 8080!
        </Button>
        {dbCreatedContainerId && (
          <>
            <Button variant="contained" onClick={() => startContainer(dbCreatedContainerId)}>
              Start Container
            </Button>
            <Button variant="contained" onClick={() => subscribeToLogs(dbCreatedContainerId)}>
              Receive logs
            </Button>
          </>
        )}
      </Container>
      <Container maxWidth={'xl'}>
        <ContainerList></ContainerList>
        <WebSocketMessages></WebSocketMessages>
      </Container>
    </DashboardLayout>
  );
};
