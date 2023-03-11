import { useAppDispatch } from '../../store/hooks';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { createContainerActions, createContainerThunk } from '../../features/container/createContainerSlice';
import { Button, FormControl, Grid } from '@mui/material';
import { buildImageLogsActions } from '../../features/container/buildImageLogsSlice';

interface FormProps {
  githubURL: string;
  containerName: string;
  dockerfileName?: string;
  hostPort?: string;
  containerPort?: string;
}

export const CreateContainerForm = () => {
  const dispatch = useAppDispatch();

  function onSubmitClick() {
    dispatch(createContainerActions.clear());
    dispatch(buildImageLogsActions.clear());
  }

  return (
    <FormContainer onSuccess={(data: FormProps) => dispatch(createContainerThunk({ body: data }))}>
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
        <Button type='submit' variant='contained' sx={{ mb: 2 }} onClick={onSubmitClick}>
          create
        </Button>
      </FormControl>
    </FormContainer>
  );
};
