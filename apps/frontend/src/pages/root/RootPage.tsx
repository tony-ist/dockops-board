import ContainerList from '../../components/container-list/ContainerList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { WebSocketMessages } from '../../components/web-socket-messages/WebSocketMessages';
import { Button } from '@mui/material';
import { newContainerThunk } from '../../features/container-new/newContainerSlice';

export const RootPage = () => {
  const dispatch = useAppDispatch();
  const newContainer = useAppSelector((state) => state.newContainer.container);

  function postNewContainer() {
    dispatch(
      newContainerThunk({
        containerName: 'temp-echo-server2',
        githubURL: 'https://github.com/mendhak/docker-http-https-echo/archive/refs/heads/master.zip',
        dockerfileName: 'Dockerfile',
        containerPort: '8080',
        hostPort: '8080',
      })
    );
  }

  return (
    <div>
      <Button variant="contained" onClick={postNewContainer}>
        Deploy Echo Server!
      </Button>
      {newContainer && <div>New Container Id: {newContainer.containerId}</div>}
      <ContainerList></ContainerList>
      <WebSocketMessages></WebSocketMessages>
    </div>
  );
};
