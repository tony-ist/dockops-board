import { ContainerList } from '../../components/container-list/ContainerList';
import { useAppDispatch } from '../../store/hooks';
import { WebSocketMessages } from '../../components/web-socket-messages/WebSocketMessages';
import { Button } from '@mui/material';
import { createContainerThunk } from '../../features/container-new/createContainerSlice';
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

  return (
    <>
      <DashboardLayout>
        <Button variant="contained" onClick={dispatchCreateContainer}>
          Deploy Echo Server!
        </Button>
        <ContainerList></ContainerList>
        <WebSocketMessages></WebSocketMessages>
      </DashboardLayout>
    </>
  );
};
