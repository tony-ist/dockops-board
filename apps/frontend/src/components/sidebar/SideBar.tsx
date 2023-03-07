import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { sideBarActions } from '../../features/sidebar/sideBarSlice';
import { Ballot, PlaylistAdd } from '@mui/icons-material';
import { SIDEBAR_WIDTH } from '../../constants/SideBarConstants';
import { CSSObject, Drawer, useMediaQuery } from '@mui/material';
import { LinkStyled } from '../link-styled/LinkStyled';

interface PageType {
  href: string;
  name: string;
  icon: React.ReactElement;
}

interface DrawerItemProps {
  isOpen: boolean;
  page: PageType;
}

const pages: Array<PageType> = [
  {
    href: '/',
    name: 'Containers',
    icon: <Ballot />,
  },
  {
    href: '/create-container',
    name: 'Create container',
    icon: <PlaylistAdd />,
  },
];

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerItem = (props: DrawerItemProps) => {
  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <LinkStyled to={props.page.href}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: props.isOpen ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          {React.cloneElement(props.page.icon, {
            sx: {
              minWidth: 0,
              mr: props.isOpen ? 3 : 'auto',
              justifyContent: 'center',
            },
          })}
          <ListItemText primary={props.page.name} sx={{ opacity: props.isOpen ? 1 : 0, fontWeight: 1000 }} />
        </ListItemButton>
      </LinkStyled>
    </ListItem>
  );
};

export const SideBar = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isSideBarTemporary = !useMediaQuery('(min-width:600px)');
  const isOpen = useAppSelector((state) => state.sideBar.isOpen);
  const closedWidth = isSideBarTemporary ? 0 : `calc(${theme.spacing(7)} + 1px)`;
  const sxProps: CSSObject = {
    width: isOpen ? SIDEBAR_WIDTH : closedWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  };

  useEffect(() => {
    if (isSideBarTemporary) {
      dispatch(sideBarActions.close());
    }
  }, []);

  return (
    <Drawer
      variant={isSideBarTemporary ? 'temporary' : 'permanent'}
      open={isOpen}
      onClose={() => dispatch(sideBarActions.close())}
      sx={sxProps}
      PaperProps={{
        sx: sxProps,
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
        {pages.map((page, index) => (
          <DrawerItem key={index.toString()} isOpen={isOpen} page={page} />
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};
