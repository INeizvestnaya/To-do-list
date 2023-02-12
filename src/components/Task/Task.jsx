import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { TASK_PAGE } from '../../constants/routes';
import { selectDay, selectUser } from '../../redux/selectors';
import { setTask } from '../../redux/TasksSlice';
import { toggleCheckTask } from '../../utils/firestoreActions';

const Task = ({ task }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedDay = useSelector(selectDay);
  const user = useSelector(selectUser);

  const checkIconClick = () => {
    toggleCheckTask(user, selectedDay, ...task);
  };

  const editTask = () => {
    dispatch(setTask({ task }));
    navigate(TASK_PAGE);
  };

  return (
    <ListItem>
      <ListItemIcon onClick={checkIconClick}>
        {task[1].done ? (
          <CheckCircleOutlineIcon color="primary" />
        ) : (
          <RadioButtonUncheckedIcon color="primary" />
        )}
      </ListItemIcon>
      <ListItemText primary={task[0]} onDoubleClick={editTask} />
    </ListItem>
  );
};

Task.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  task: PropTypes.array.isRequired
};

export default Task;
