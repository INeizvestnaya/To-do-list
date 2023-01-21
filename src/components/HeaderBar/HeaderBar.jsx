import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';

import classes from './HeaderBar.module.css';

const HeaderBar = ({ children, leftItem, rightItem }) => (
  <Box>
    <AppBar position="static">
      <Toolbar>
        {leftItem}
        <Typography
          variant="h5"
          margin="normal"
          component="div"
          marginLeft={2}
          className={classes.label}
        >
          {children}
        </Typography>
        {rightItem}
      </Toolbar>
    </AppBar>
  </Box>
);

HeaderBar.defaultProps = {
  leftItem: null,
  rightItem: null
};

HeaderBar.propTypes = {
  children: PropTypes.string.isRequired,
  leftItem: PropTypes.element,
  rightItem: PropTypes.element
};

export default React.memo(HeaderBar);
