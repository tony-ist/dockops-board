import { Button, Container, FormControl, Grid } from '@mui/material';
import styles from './CreateContainer.module.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { webSocketActions } from '../../features/web-socket/webSocketSlice';
import { DashboardLayout } from '../../layouts/dashboard/dashboard';
import { LinkStyled } from '../../components/link-styled/LinkStyled';
import { LogsViewer } from '../../components/logs-viewer/LogsViewer';

interface FormProps {
  githubURL: string;
  containerName: string;
  dockerfileName?: string;
  hostPort?: string;
  containerPort?: string;
}

const Form = () => {
  const dispatch = useAppDispatch();

  return (
    <FormContainer onSuccess={(data: FormProps) => dispatch(webSocketActions.createContainerRequest({ ...data }))}>
      {/*<FormContainer onSuccess={(data: FormProps) => console.log(data)}>*/}
      <FormControl
        fullWidth={true}
        sx={{
          '& .MuiTextField-root': { mb: 2, mr: 2, display: 'flex' },
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <TextFieldElement name='githubURL' label='githubURL' variant='filled' required={true} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldElement name='containerName' label='containerName' variant='filled' required={true} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldElement name='dockerfileName' label='dockerfileName' variant='filled' placeholder='Dockerfile' />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextFieldElement name='hostPort' label='hostPort' variant='filled' />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextFieldElement name='containerPort' label='containerPort' variant='filled' />
          </Grid>
        </Grid>
        <Button type='submit' variant='contained' sx={{ mb: 2 }}>
          create
        </Button>
      </FormControl>
    </FormContainer>
  );
};

export const CreateContainerPage = () => {
  const theme = useTheme();
  const logs = useAppSelector((state) => state.containerLogs.messages);
  const createdDbContainerId = useAppSelector((state) => state.createContainer.dbContainerId);

  return (
    <DashboardLayout>
      <Container
        className={styles.content}
        maxWidth='xl'
        sx={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box>
          <Typography variant='h4'>Create new container form</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ mb: 2 }}>
          <Form />
          {logs.length > 0 && <LogsViewer logs={logs} />}
        </Box>
        <Box className={styles.closeButtonSection}>
          <Divider sx={{ mb: 2, width: '100%' }} />
          {createdDbContainerId && (
            <>
              <Typography variant='body1' color={theme.palette.primary.main}>
                Conttainer [ContainerName] buliled and created
              </Typography>
              <LinkStyled to={`/container/${createdDbContainerId}/`}>
                <Button variant='contained'>go to container</Button>
              </LinkStyled>
            </>
          )}
        </Box>
      </Container>
    </DashboardLayout>
  );
};
