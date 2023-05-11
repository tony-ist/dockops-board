import { ContainerList } from '../../components/container-list/ContainerList';
import { Button, Container } from '@mui/material';
import { AddBox } from '@mui/icons-material';
import styles from './RootPage.module.css';
import Box from '@mui/material/Box';

export const RootPage = () => {
  return (
    <>
      <Container maxWidth="xl" >
        <Box className={styles.newButtonContainer}>
          <Button variant="contained" endIcon={<AddBox/>}>
            new
          </Button>
        </Box>
      </Container>
      <Container maxWidth="xl" sx={{ p: { md: 3, sm: 1, xs: 1 } }}>
        <ContainerList/>
      </Container>
    </>
  );
};
