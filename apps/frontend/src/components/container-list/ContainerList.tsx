import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './ContainerList.module.css';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { containersSelectors, fetchContainersThunk } from '../../features/container/containersSlice';
import { store } from '../../store/store';
import { useTheme } from '@mui/material/styles';
import { ScrollableBox } from '../scrollable-box/ScrollableBox';
import { Container } from '../../generated-sources/backend-api';
import { LinkStyled } from '../link-styled/LinkStyled';
import Box from '@mui/material/Box';
import { ContainerStatusIndicator } from '../status-indicator/ContainerStatusIndicator';

interface ContainerListItemOptions {
  container: Container;
  index: number;
}

const ContainerListItem = (props: ContainerListItemOptions) => {
  const appTheme = useTheme();
  const { index, container } = props;
  return (
    <LinkStyled to={`/container/${container.id}/`} key={index}>
      <Box position='relative'>
        <Grid
          container
          className={styles.containerListItem}
          sx={{
            color: appTheme.palette.primary.contrastText,
            background: appTheme.palette.background.paper,
            '&:hover': {
              border: `2px solid ${appTheme.palette.primary.main}`,
            },
            boxShadow: 2,
          }}
        >
          <Grid item xs={1} sm={1} md={1} sx={{ color: appTheme.palette.text.primary }}>
            {index + 1}
          </Grid>
          <Grid item sm={8} md={6}>
            <Typography variant='h6' sx={{ color: appTheme.palette.text.primary }}>
              {container.dockerName}
            </Typography>
            <Typography variant='body2' sx={{ color: appTheme.palette.text.secondary }}>
              {container.buildStatus}
            </Typography>
            <Typography variant='body2' sx={{ color: appTheme.palette.text.secondary }}>
              {container.image}
            </Typography>
            <Typography
              variant='caption'
              sx={{
                color: appTheme.palette.text.disabled,
                overflowX: 'auto',
                wordWrap: 'break-word',
                wordBreak: 'break-word',
              }}
            >
              {container.dockerId}
            </Typography>
          </Grid>
          <Grid item sm={3} md={5}>
            <Grid container>
              <Grid item sm={12} md={6} lg={3}>
                <Typography component='div' variant='body2' sx={{ color: appTheme.palette.text.secondary }}>
                  [PORTS]
                </Typography>
              </Grid>
              <Grid item sm={12} md={6} lg={3}>
                <Typography component='div' variant='body2' sx={{ color: appTheme.palette.text.secondary }}>
                  [MEM_USAGE]
                </Typography>
              </Grid>
              <Grid item sm={12} md={6} lg={3}>
                <Typography component='div' variant='body2' sx={{ color: appTheme.palette.text.secondary }}>
                  [CPU_USAGE]
                </Typography>
              </Grid>
              <Grid item sm={12} md={6} lg={3}>
                <Typography component='div' variant='body2' sx={{ color: appTheme.palette.text.secondary }}>
                  [HDD_USAGE]
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}
        >
          <ContainerStatusIndicator container={container} />
        </Box>
      </Box>
    </LinkStyled>
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
    <ScrollableBox
      sx={{
        height: 'calc(100vh - 165px)',
        paddingRight: 2,
      }}
    >
      {containerList.map((container, index) => (
        <ContainerListItem container={container} index={index} key={index} />
      ))}
    </ScrollableBox>
  );
};
