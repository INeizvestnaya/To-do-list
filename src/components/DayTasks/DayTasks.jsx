import List from '@mui/material/List';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

const DayTasks = ({ dayTasks }) => {
  if (!dayTasks) {
    return null;
  }

  const sortedTasks = Object.entries(dayTasks);
  if (sortedTasks.length) {
    sortedTasks.sort((cur, next) => {
      if (cur[1].done && !next[1].done) {
        return 1;
      }

      if (!cur[1].done && next[1].done) {
        return -1;
      }

      return 0;
    });
  }

  return (
    <List>
      {sortedTasks.map((task) => (
        <Task task={task} key={task[0]} />
      ))}
    </List>
  );
};

DayTasks.defaultProps = {
  dayTasks: {}
};

DayTasks.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dayTasks: PropTypes.object
};

export default DayTasks;
