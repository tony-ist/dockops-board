import { useEffect } from 'react';
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

interface ContainerListItemOptions {
  container: Container;
  index: number;
}

const ContainerListItem = (props: ContainerListItemOptions) => {
  const appTheme = useTheme();
  const { index, container } = props;
  return (
    <LinkStyled to={`/container/${container.id}/`} key={index}>
      <Box display={'flex'} position={'relative'}>
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
          <Grid item xs={1} sx={{ color: appTheme.palette.text.primary }}>
            {index + 1}
          </Grid>
          <Grid item xs={6}>
            <Typography variant={'h6'} sx={{ color: appTheme.palette.text.primary }}>
              [ContainerName]
            </Typography>
            <Typography variant={'body2'} sx={{ color: appTheme.palette.text.secondary }}>
              {container.image}
            </Typography>
            <Typography
              variant={'caption'}
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
          <Grid item xs={5}>
            <Grid container>
              <Grid item sm={6} md={3}>
                <Typography variant={'body2'} sx={{ color: appTheme.palette.text.secondary }}>
                  [PORTS]
                </Typography>
              </Grid>
              <Grid item sm={6} md={3}>
                <Typography variant={'body2'} sx={{ color: appTheme.palette.text.secondary }}>
                  [MEM_USAGE]
                </Typography>
              </Grid>
              <Grid item sm={6} md={3}>
                <Typography variant={'body2'} sx={{ color: appTheme.palette.text.secondary }}>
                  [CPU_USAGE]
                </Typography>
              </Grid>
              <Grid item sm={6} md={3}>
                <Typography variant={'body2'} sx={{ color: appTheme.palette.text.secondary }}>
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
            width: '8px',
            height: '8px',
            borderRadius: '20px',
            backgroundColor: index % 2 == 0 ? 'lightgreen' : 'red',
            boxShadow: `0 0 4px ${index % 2 == 0 ? 'lightgreen' : 'red'}`,
          }}
        ></Box>
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
        marginTop: 2,
      }}
    >
      {containerList.map((container, index) => (
        <ContainerListItem container={container} index={index} key={index} />
      ))}
    </ScrollableBox>
  );
};
