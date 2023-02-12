import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { CALENDAR, TASK_EDITOR } from '../../constants/routes';
import { selectUser } from '../../redux/selectors';
import { setTask } from '../../redux/TasksSlice';
import { deleteTask, toggleCheckTask } from '../../utils/firestoreActions';
import Confirmation from '../Confirmation';
import classes from './BottomMenu.module.css';

const UNDO = 'Undo';
const COMPLETE = 'Complete';

const BottomMenu = ({ selectedTask, selectedDay }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const [confirmOpened, setConfirmOpened] = useState(false);

  const unselectTask = () => dispatch(setTask({ task: null }));

  const checkTaskClick = () => {
    unselectTask();
    toggleCheckTask(user, selectedDay, ...selectedTask);
    navigate(-1);
  };

  const deleteButtonClick = () => {
    setConfirmOpened(true);
  };

  const confirmDeletion = async () => {
    deleteTask(user, selectedDay, selectedTask[0]);
    unselectTask();
    navigate(CALENDAR);
  };

  const cancelDeletion = () => {
    setConfirmOpened(false);
  };

  const editButtonClick = () => {
    navigate(TASK_EDITOR);
  };

  return (
    <>
      <Confirmation
        opened={confirmOpened}
        confirm={confirmDeletion}
        cancel={cancelDeletion}
      >
        Do you really want to delete the task?
      </Confirmation>
      <Box marginLeft={4} marginRight={6} className={classes.buttonsBox}>
        <IconButton onClick={deleteButtonClick}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={editButtonClick}>
          <EditIcon />
        </IconButton>
        <Box className={classes.button}>
          <Button
            color="secondary"
            variant="contained"
            endIcon={<CheckIcon />}
            onClick={checkTaskClick}
          >
            {selectedTask[1].done ? UNDO : COMPLETE}
          </Button>
        </Box>
      </Box>
    </>
  );
};

BottomMenu.defaultProps = {
  selectedTask: ['', { description: '', done: false }]
};

BottomMenu.propTypes = {
  // eslint-disable-next-line
  selectedTask: PropTypes.array,
  selectedDay: PropTypes.string.isRequired
};

export default BottomMenu;
