import { Button, FormControl, Grid, Modal, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useAppSelector } from '../../store/hooks';
import styles from './CreateNewContainerModal.module.css';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { createNewContainerModalActions } from '../../features/create-new-container-modal/createNewContainerModalSlice';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { ChangeEvent, useState } from 'react';

interface FormState {
  githubURL: string;
  containerName: string;
  dockerfileName: string;
  hostPort: string;
  containerPort: string;
}


const Form = () => {
  const [formData, setFormData] = useState<FormState>({
    githubURL: '',
    containerName: '',
    dockerfileName: '',
    hostPort: '',
    containerPort: '',
  });
  const inputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>, key: string) => {
    setFormData((previousState) => ({ ...previousState, [key]: event.target.value }));
  };

  return (
    <FormControl fullWidth={true} sx={{
      '& .MuiTextField-root': { mb: 2, mr: 2, display: 'flex' },
    }}>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            id="githubURL"
            label="githubURL"
            variant="filled"
            required={true}
            value={formData.githubURL}
            onChange={(event) => inputOnChangeHandler(event as ChangeEvent<HTMLInputElement>, 'githubURL')}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="containerName"
            label="containerName"
            variant="filled"
            required={true}
            value={formData.containerName}
            onChange={(event) => inputOnChangeHandler(event as ChangeEvent<HTMLInputElement>, 'containerName')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="dockerfileName"
            label="dockerfileName"
            variant="filled"
            placeholder={'Dockerfile'}
            value={formData.dockerfileName}
            onChange={(event) => inputOnChangeHandler(event as ChangeEvent<HTMLInputElement>, 'dockerfileName')}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            id="hostPort"
            label="hostPort"
            variant="filled"
            value={formData.hostPort}
            onChange={(event) => inputOnChangeHandler(event as ChangeEvent<HTMLInputElement>, 'hostPort')}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            id="containerPort"
            label="containerPort"
            variant="filled"
            value={formData.containerPort}
            onChange={(event) => inputOnChangeHandler(event as ChangeEvent<HTMLInputElement>, 'containerPort')}
          />
        </Grid>
      </Grid>
      <Button sx={{ mb: 2 }} variant={'contained'}>create</Button>
    </FormControl>

  )
    ;
};


export const CreateNewContainerModal = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isOpen = useAppSelector((state) => state.createNewContainerModal.isOpen);
  const dbCreatedContainerId = useAppSelector((state) => state.createContainer.dbContainerId);

  // function createContainer(containerName: string, hostPort: string) {
  //   dispatch(
  //     createContainerRequest({
  //       containerName,
  //       githubURL: 'https://github.com/mendhak/docker-http-https-echo/archive/refs/heads/master.zip',
  //       dockerfileName: 'Dockerfile',
  //       containerPort: '8080',
  //       hostPort,
  //     })
  //   );
  // }
  //
  // function startContainer(dbContainerId: number) {
  //   dispatch(
  //     startContainerThunk({
  //       dbContainerId,
  //     })
  //   );
  // }
  //
  // function subscribeToLogs(dbContainerId: number) {
  //   dispatch(
  //     containerLogsRequest({
  //       dbContainerId,
  //     })
  //   );
  // }

  return (
    <Modal open={isOpen}>
      <Box className={styles.createNewContainerModal} sx={{
        border: `2px solid ${theme.palette.primary.light}`,
        bgcolor: theme.palette.background.paper,
        boxShadow: 10,
        maxWidth: theme.breakpoints.values.md,
        height: '80vh'
      }}>
        <Box>
          <Typography variant={'h4'}>Create new container form</Typography>
        </Box>
        <Divider sx={{ mb: 2 }}/>
        <Box sx={{ height: 100 }}>
          <Form/>
        </Box>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-end',
          justifyContent: 'right',
          // height: '50%',
          '& > button': {
            marginLeft: 2,
          },
        }}>
          <Divider sx={{ mb: 2, width: '100%' }}/>
          <Button variant={'contained'} color={'error'}
                  onClick={() => (dispatch(createNewContainerModalActions.close()))}>close</Button>
        </Box>
      </Box>
    </Modal>
  );
};