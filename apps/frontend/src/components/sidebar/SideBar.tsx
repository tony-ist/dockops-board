import { Box, Drawer } from '@mui/material';

import styles from './SideBar.module.css';

export const SideBar = () => {
  const content = (
    <Box className={styles.container}>
      <div>123123</div>
    </Box>
  );
  return (
    <Drawer anchor="left" variant="temporary" open={true}>
      {content}
    </Drawer>
  );
};
