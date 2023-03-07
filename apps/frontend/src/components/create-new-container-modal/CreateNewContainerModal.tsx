import { Button, FormControl, Grid, Modal } from '@mui/material';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from '../../pages/create-contaner/CreateContainer.module.css';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { webSocketActions } from '../../features/web-socket/webSocketSlice';
import { ScrollableBox } from '../scrollable-box/ScrollableBox';
import { containerLogsActions } from '../../features/container/containerLogsSlice';
import { LinkStyled } from '../link-styled/LinkStyled';

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
            <TextFieldElement
              name='dockerfileName'
              label='dockerfileName'
              variant='filled'
              placeholder={'Dockerfile'}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextFieldElement name='hostPort' label='hostPort' variant='filled' />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextFieldElement name='containerPort' label='containerPort' variant='filled' />
          </Grid>
        </Grid>
        <Button type={'submit'} variant={'contained'} sx={{ mb: 2 }}>
          create
        </Button>
      </FormControl>
    </FormContainer>
  );
};

interface CreateNewContainerModalProps {
  open: boolean;
  setopen: Dispatch<SetStateAction<boolean>>;
}

export const CreateNewContainerModal = (props: CreateNewContainerModalProps) => {
  const dispatch = useAppDispatch();
  const logs = useAppSelector((state) => state.containerLogs.messages);
  const createdDbContainerId = useAppSelector((state) => state.createContainer.dbContainerId);
  const theme = useTheme();
  const scrollRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }
  }, [logs]);

  return (
    <Modal open={props.open}>
      <Box
        className={styles.createNewContainerModal}
        // sx={{
        // //   border: `2px solid ${theme.palette.primary.light}`,
        // //   bgcolor: theme.palette.background.paper,
        // //   maxWidth: theme.breakpoints.values.md,
        //   boxShadow: 5,
        // }}
      >
        <Box
          className={styles.content}
          sx={{
            maxWidth: theme.breakpoints.values.md,
            border: `2px solid ${theme.palette.primary.light}`,
            backgroundColor: theme.palette.background.paper,
            boxShadow: 15,
          }}
        >
          <Box>
            <Typography variant={'h4'}>Create new container form</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ height: 'calc(100% - 120px)', mb: 2 }}>
            {logs.length === 0 ? (
              <Form />
            ) : (
              <ScrollableBox className={styles.logs} ref={scrollRef}>
                {logs.map((row) => (
                  <p className={styles.logsLine}>{row.text}</p>
                ))}
              </ScrollableBox>
            )}
          </Box>
          <Box className={styles.closeButtonSection}>
            <Divider sx={{ mb: 2, width: '100%' }} />

            {createdDbContainerId && (
              <LinkStyled to={`/container/${createdDbContainerId}/`}>
                <Button variant={'contained'}>go to container</Button>
              </LinkStyled>
            )}
            <Button
              variant={'contained'}
              color={'error'}
              onClick={() => {
                if (logs.length > 0) {
                  dispatch(containerLogsActions.wipeLogs());
                }
                props.setopen(false);
              }}
            >
              close
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
