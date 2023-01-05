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

import { selectTask } from '../../redux/TasksSlice';
import { deleteTask, toggleCheckTask } from '../../utils/firestoreActions';
import Confirmation from '../Confirmation/Confirmation';

const BottomMenu = ({ selectedTask, selectedDay }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.tasks.user);

  const [confirmOpened, setConfirmOpened] = useState(false);

  const unselectTask = () => dispatch(selectTask({ task: null }));

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
    navigate('/calendar');
  };

  const cancelDeletion = () => {
    setConfirmOpened(false);
  };

  const editButtonClick = () => {
    navigate('/task-editor');
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
      <Box marginLeft={4} marginRight={6} sx={{ display: 'flex' }}>
        <IconButton sx={{ marginRight: 2 }} onClick={deleteButtonClick}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={editButtonClick}>
          <EditIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, textAlign: 'end' }}>
          <Button
            color="secondary"
            variant="contained"
            endIcon={<CheckIcon />}
            onClick={checkTaskClick}
          >
            {selectedTask[1].done ? 'Undo' : 'Complete'}
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
