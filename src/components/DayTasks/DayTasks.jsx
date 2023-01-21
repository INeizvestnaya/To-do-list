import List from '@mui/material/List';
import { useSelector } from 'react-redux';

import { selectAllTasks, selectDay } from '../../redux/selectors';
import Task from '../Task/Task';

const DayTasks = () => {
  const tasks = useSelector(selectAllTasks);
  const selectedDay = useSelector(selectDay);

  const dayTasks = tasks[selectedDay];

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

export default DayTasks;
