import { ContainerList } from '../../components/container-list/ContainerList';
import { Box, Button, Container } from '@mui/material';
import { AddBox, Refresh } from '@mui/icons-material';
import { fetchContainersThunk } from '../../features/container/containersSlice';
import { useAppDispatch } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';

export const RootPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 40,
          width: '100%',
          textAlign: 'right ',
        }}
      >
        <Box
          sx={{
            marginRight: 2,
            padding: 2,
            borderRadius: '5px',
            float: 'right',
            '& > button:not(:last-child)': {
              marginRight: 2,
            },
          }}
        >
          <Button variant='contained' endIcon={<Refresh />} onClick={() => dispatch(fetchContainersThunk())}>
            refresh
          </Button>
          <Button variant='contained' endIcon={<AddBox />} onClick={() => navigate('/container/create')}>
            new
          </Button>
        </Box>
      </Box>
      <Container maxWidth='xl' sx={{ marginTop: '50px' }}>
        <ContainerList />
      </Container>
    </>
  );
};
