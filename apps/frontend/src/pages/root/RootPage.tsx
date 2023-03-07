import { ContainerList } from '../../components/container-list/ContainerList';
import { Button, Container } from '@mui/material';
import { DashboardLayout } from '../../layouts/dashboard/dashboard';
import { WebSocketMessages } from '../../components/web-socket-messages/WebSocketMessages';
import { AddBox } from '@mui/icons-material';

export const RootPage = () => {
  return (
    <DashboardLayout>
      <Container
        maxWidth='xl'
        sx={{
          display: 'flex',
          justifyContent: 'right',
          '& > button': {
            marginRight: 2,
          },
        }}
      >
        <Button variant='contained' endIcon={<AddBox />}>
          new
        </Button>
      </Container>
      <Container maxWidth='xl' sx={{ p: { md: 3, sm: 1, xs: 1 } }}>
        <ContainerList></ContainerList>
        <WebSocketMessages></WebSocketMessages>
      </Container>
    </DashboardLayout>
  );
};
