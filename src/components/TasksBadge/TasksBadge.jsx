import PropTypes from 'prop-types';
import React from 'react';

import { StyledBadge } from './components';

const TasksBadge = ({ dark, left, display }) => {
  return (
    <StyledBadge
      badgeContent=" "
      variant="dot"
      color={dark ? 'info' : 'primary'}
      left={left ? 'left' : undefined}
      display={display ? 'display' : undefined}
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
