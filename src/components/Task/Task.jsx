import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { selectTask } from '../../redux/TasksSlice';
import { toggleCheckTask } from '../../utils/firestoreActions';

const Task = ({ task }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedDay = useSelector((state) => state.tasks.selectedDay);

  const checkIconClick = () => {
    toggleCheckTask(selectedDay, ...task);
  };

  const editTask = () => {
    dispatch(selectTask({ task }));
    navigate('/task');
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
