import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { sideBarActions } from '../../features/sidebar/sideBarSlice';
import { ViewList } from '@mui/icons-material';
import { SIDEBAR_WIDTH } from '../../constants/SideBarConstatns';
import { Drawer, useMediaQuery } from '@mui/material';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const SideBar = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = !useMediaQuery('(min-width:800px)');
  const isOpen = useAppSelector((state) => state.sideBar.isOpen);
  const closedWidth = isMobile ? 0 : `calc(${theme.spacing(7)} + 1px)`;

  useEffect(() => {
    if (isMobile) {
      dispatch(sideBarActions.close());
    }
  }, []);

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isOpen}
      onClose={() => dispatch(sideBarActions.close())}
      // onClose={() => (console.log('close'))}
      PaperProps={{
        sx: {
          width: isOpen ? SIDEBAR_WIDTH : closedWidth,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        },
      }}
    >
      <DrawerHeader>
        <IconButton
          onClick={() => {
            dispatch(sideBarActions.toggle());
          }}
        >
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem key={'containers'} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: isOpen ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <ViewList></ViewList>
            </ListItemIcon>
            <ListItemText primary={'containers'} sx={{ opacity: isOpen ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};
