import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchContainerListThunk } from '../../features/container-list/containerListSlice';
import styles from './ContainerList.module.css';
import { Container } from '../../types/models/containerType';
import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Label } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const ContainerListItem = (props: { container: Container; index: number }) => {
  const { index, container } = props;
  return (
    <Link to={`/container/${container.id}/`} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Grid container className={styles.containerListItem} columnSpacing={2}>
        <Grid item xs={1}>
          {index + 1}
        </Grid>
        <Grid item xs={7}>
          <Typography variant={'h6'}>[ContainerName]</Typography>
          <Typography variant={'body2'}>{container.image}</Typography>
          <Typography variant={'caption'}>{container.dockerId}</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant={'body2'}>[MEM USAGE]</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant={'body2'}>[CPU USAGE]</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant={'body2'}>[HDD USAGE]</Typography>
        </Grid>
        <Grid item xs={1}>
          [Status]
        </Grid>
      </Grid>
    </Link>
  );
};

export const ContainerList = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.containerList.status);
  const containerList = useAppSelector((state) => state.containerList.containerList);
  const error = useAppSelector((state) => state.containerList.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContainerListThunk());
    }
  }, [dispatch, status]);

  if (error !== null) {
    return <div className={styles.error}>{error}</div>;
  }

  return containerList.map((container, index) => <ContainerListItem container={container} index={index} />);
};
