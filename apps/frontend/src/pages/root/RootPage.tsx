import { ContainerList } from '../../components/container-list/ContainerList';
import { Button, Container } from '@mui/material';
import { DashboardLayout } from '../../layouts/dashboard/dashboard';
import { WebSocketMessages } from '../../components/web-socket-messages/WebSocketMessages';
import { AddBox } from '@mui/icons-material';
import { CreateNewContainerModal } from '../../components/create-new-container-modal/CreateNewContainerModal';
import { useState } from 'react';

export const RootPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <CreateNewContainerModal open={isModalOpen} setopen={setIsModalOpen} />
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
        <Button variant='contained' endIcon={<AddBox />} onClick={() => setIsModalOpen(true)}>
          new
        </Button>
      </Container>
      <Container maxWidth={'xl'}>
        <ContainerList></ContainerList>
        <WebSocketMessages></WebSocketMessages>
      </Container>
    </DashboardLayout>
  );
};
