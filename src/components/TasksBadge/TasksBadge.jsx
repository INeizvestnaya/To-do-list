import Badge from '@mui/material/Badge';
import PropTypes from 'prop-types';
import React from 'react';

const TasksBadge = ({ dark, left, display }) => {
  return (
    <Badge
      badgeContent=" "
      variant="dot"
      color={dark ? 'info' : 'primary'}
      sx={{
        position: 'relative',
        left: left ? '10px' : '-10px',
        visibility: display ? 'visible' : 'hidden'
      }}
    />
  );
};

TasksBadge.defaultProps = {
  dark: false,
  left: false
};

TasksBadge.propTypes = {
  dark: PropTypes.bool,
  left: PropTypes.bool,
  display: PropTypes.bool.isRequired
};

export default React.memo(TasksBadge);
