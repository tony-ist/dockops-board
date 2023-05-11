import { useAppDispatch } from '../../store/hooks';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { createContainerActions, createContainerThunk } from '../../features/container/createContainerSlice';
import { Box, Button, Grid } from '@mui/material';
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
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextFieldElement fullWidth={true} name='githubURL' label='Github URL' variant='standard' required={true} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextFieldElement
            fullWidth={true}
            name='containerName'
            label='Container Name'
            variant='standard'
            required={true}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextFieldElement
            fullWidth={true}
            name='dockerfileName'
            label='Dockerfile Name'
            variant='standard'
            placeholder='Dockerfile'
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextFieldElement fullWidth={true} name='hostPort' label='Host Port' variant='standard' />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextFieldElement fullWidth={true} name='containerPort' label='Container Port' variant='standard' />
        </Grid>
      </Grid>
      <Box
        sx={{
          textAlign: 'right',
          marginTop: 1,
          marginBottom: 1,
        }}
      >
        <Button type='submit' variant='contained' onClick={onSubmitClick}>
          Create
        </Button>
      </Box>
    </FormContainer>
  );
};
