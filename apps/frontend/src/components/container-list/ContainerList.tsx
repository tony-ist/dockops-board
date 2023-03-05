import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './ContainerList.module.css';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { containersSelectors, fetchContainersThunk } from '../../features/container/containersSlice';
import { store } from '../../store/store';
import { useTheme } from '@mui/material/styles';
import { ScrollableBox } from '../scrollable-box/ScrollableBox';
import { Container } from '../../generated-sources/backend-api';

interface ContainerListItemOptions {
  container: Container;
  index: number;
}

const ContainerListItem = (props: ContainerListItemOptions) => {
  const appTheme = useTheme();
  const { index, container } = props;
  return (
    <Link to={`/container/${container.id}/`} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Grid
        container
        className={styles.containerListItem}
        sx={{
          color: appTheme.palette.primary.contrastText,
          background: appTheme.palette.background.paper,
          '&:hover': {
            border: `2px solid ${appTheme.palette.primary.main}`,
          },
        }}
      >
        <Grid item xs={1} sx={{ color: appTheme.palette.text.primary }}>
          {index + 1}
        </Grid>
        <Grid item xs={7}>
          <Typography variant={'h6'} sx={{ color: appTheme.palette.text.primary }}>
            [ContainerName]
          </Typography>
          <Typography variant={'body2'} sx={{ color: appTheme.palette.text.secondary }}>
            {container.image}
          </Typography>
          <Typography variant={'caption'} sx={{ color: appTheme.palette.text.disabled }}>
            {container.dockerId}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant={'body2'} sx={{ color: appTheme.palette.text.secondary }}>
            [MEM USAGE]
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant={'body2'} sx={{ color: appTheme.palette.text.secondary }}>
            [CPU USAGE]
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant={'body2'} sx={{ color: appTheme.palette.text.secondary }}>
            [HDD USAGE]
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{ color: appTheme.palette.text.primary }}>
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
      dispatch(fetchContainersThunk());
    }
  }, [dispatch, status]);

  if (error !== null) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <ScrollableBox className={styles.containerList}>
      {containerList.map((container, index) => (
        <ContainerListItem container={container} index={index} key={index} />
      ))}
    </ScrollableBox>
  );
};
