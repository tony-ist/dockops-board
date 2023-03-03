import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './ContainerList.module.css';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { containersSelectors, fetchContainersThunk } from '../../features/container/containersSlice';
import { store } from '../../store/store';
import { Container } from 'common-src';

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
  const status = useAppSelector((state) => state.containers.status);
  const error = useAppSelector((state) => state.containers.error);
  const containerList = containersSelectors.selectAll(store.getState());

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchContainersThunk({}));
    }
  }, [dispatch, status]);

  if (error !== null) {
    return <div className={styles.error}>{error}</div>;
  }

  return containerList.map((container, index) => <ContainerListItem container={container} index={index} key={index} />);
};
