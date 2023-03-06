import { ContainerList } from '../../components/container-list/ContainerList';
import { useAppDispatch } from '../../store/hooks';
import { Button, Container } from '@mui/material';
import { DashboardLayout } from '../../layouts/dashboard/dashboard';
import { WebSocketMessages } from '../../components/web-socket-messages/WebSocketMessages';
import { AddBox } from '@mui/icons-material';
import { createNewContainerModalActions } from '../../features/create-new-container-modal/createNewContainerModalSlice';
import { CreateNewContainerModal } from '../../components/create-new-container-modal/CreateNewContainerModal';

export const RootPage = () => {
  const dispatch = useAppDispatch();

  return (
    <DashboardLayout>
      <CreateNewContainerModal></CreateNewContainerModal>
      <Container
        maxWidth={'xl'}
        sx={{
          display: 'flex',
          justifyContent: 'right',
          '& > button': {
            marginRight: 2,
          },
        }}
      >
        <Button variant="contained" endIcon={<AddBox/>}
                onClick={() => (dispatch(createNewContainerModalActions.open()))}>new</Button>
      </Container>
      <Container maxWidth={'xl'}>
        <ContainerList></ContainerList>
        <WebSocketMessages></WebSocketMessages>
      </Container>
    </DashboardLayout>
  );
};
