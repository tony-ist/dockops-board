import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { sideBarActions } from '../../features/sidebar/sideBar';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SIDEBAR_WIDTH } from '../../constants/SideBarConstatns';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar/AppBar';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

//AppBar config taken from https://mui.com/material-ui/react-drawer/#MiniDrawer.tsx
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: SIDEBAR_WIDTH,
    width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Header = () => {
  const dispatch = useAppDispatch();
  const isSideBarOpen = useAppSelector((state) => state.sideBar.isOpen);
  return (
    <AppBar position="fixed" open={isSideBarOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => {
            dispatch(sideBarActions.toggle());
          }}
          edge="start"
          sx={{
            marginRight: 5,
            ...(isSideBarOpen && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Dockops dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
