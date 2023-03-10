import { ContainerList } from '../../components/container-list/ContainerList';
import { Button, Container } from '@mui/material';
import { AddBox, Refresh } from '@mui/icons-material';
import { fetchContainersThunk } from '../../features/container/containersSlice';
import { useAppDispatch } from '../../store/hooks';

export const RootPage = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Container
        maxWidth='xl'
        sx={{
          display: 'flex',
          justifyContent: 'right',
          '& > button': {
            marginLeft: 2,
          },
        }}
      >
        <Button variant='contained' endIcon={<Refresh />} onClick={() => dispatch(fetchContainersThunk())}>
          refresh
        </Button>
        <Button variant='contained' endIcon={<AddBox />}>
          new
        </Button>
      </Container>
      <Container maxWidth='xl' sx={{ p: { md: 3, sm: 1, xs: 1 } }}>
        <ContainerList />
      </Container>
    </>
  );
};
