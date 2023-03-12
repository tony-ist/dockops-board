import { Alert, Button, Grid } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { containersSelectors } from '../../features/container/containersSlice';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';

interface NextButtonProps {
  dbContainerId: number | null;
}

export const NextButton = (props: NextButtonProps) => {
  const { dbContainerId } = props;
  const navigate = useNavigate();
  const container = useAppSelector((state) => containersSelectors.selectByNullableId(state, dbContainerId));

  if (!dbContainerId || !container) {
    return <></>;
  }

  return (
    <>
      <Divider sx={{ mb: 2, width: '100%' }} />
      <Grid container spacing={1} sx={{ justifyContent: 'right', alignItems: 'center' }}>
        <Grid item>
          <Alert>Container &quot;{container.dockerName}&quot; Created</Alert>
        </Grid>
        <Grid item>
          <Button
            sx={{ marginLeft: '15px' }}
            variant='contained'
            onClick={() => navigate(`/container/${dbContainerId}/`)}
          >
            Go to Container
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
