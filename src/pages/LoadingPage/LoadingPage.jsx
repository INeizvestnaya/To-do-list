import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import classes from './LoadingPage.module.css';

const LoadingPage = () => {
  return (
    <Box className={classes.box}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingPage;
