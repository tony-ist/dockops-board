import { useTheme } from '@mui/material/styles';
import { LinkStyled } from '../link-styled/LinkStyled';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import styles from './ContainerListItem.module.css';
import Typography from '@mui/material/Typography';
import { ContainerStatusIndicator } from '../status-indicator/ContainerStatusIndicator';
import React from 'react';
import { Container } from '../../generated-sources/backend-api';

interface ContainerListItemOptions {
  container: Container;
  index: number;
}

export const ContainerListItem = (props: ContainerListItemOptions) => {
  const appTheme = useTheme();
  const { index, container } = props;
  return (
    <LinkStyled className={styles.containerListItemWrapper} to={`/container/${container.id}/`} key={index}>
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
            {container.buildStatus && (
              <Typography variant='body2' sx={{ color: appTheme.palette.text.secondary }}>
                Build Status: {container.buildStatus}
              </Typography>
            )}
            <Typography variant='body2' sx={{ color: appTheme.palette.text.secondary }}>
              {container.image}
            </Typography>
            {!container.doesExist && (
              <Typography variant='body2' sx={{ color: appTheme.palette.error.main }}>
                Does not exist in docker
              </Typography>
            )}
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
