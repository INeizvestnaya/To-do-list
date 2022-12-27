import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import Confirmation from '../../components/Confirmation/Confirmation';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import { selectDay, selectTask } from '../../redux/TasksSlice';
import { addTask } from '../../utils/firestoreActions';

const TaskEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { search } = useLocation();

  const selectedTask = useSelector((state) => state.tasks.selectedTask);
  const selectedDay = useSelector((state) => state.tasks.selectedDay);

  const [name, setName] = useState(selectedTask?.[0] || '');

  const [description, setDescription] = useState(
    selectedTask?.[1].description || ''
  );

  const [date, setDate] = useState(() => {
    const dayItems = selectedDay.split('.');
    return dayjs(`${dayItems[2]}-${dayItems[1]}-${dayItems[0]}`);
  });

  const [confirmOpened, setConfirmOpened] = useState({ opened: false });

  const nameChange = (event) => {
    setName(event.target.value);
  };

  const descriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const dateChange = (value) => {
    setDate(value);
  };

  const homeClick = useCallback(() => {
    setConfirmOpened({ opened: true, home: true });
  }, []);

  const cancelClick = () => {
    setConfirmOpened({ opened: true, home: false });
  };

  const cancelConfirmation = () => {
    setConfirmOpened({ opened: false });
  };

  const unselectTask = () => dispatch(selectTask({ task: null }));

  const confirm = () => {
    if (confirmOpened.home) {
      unselectTask();
      navigate('/calendar');
    } else {
      navigate(-1);
    }
  };

  const save = () => {
    const newTaskDate = date.format('DD.MM.YYYY');

    unselectTask();
    dispatch(selectDay({ day: newTaskDate }));
    addTask(
      newTaskDate,
      name,
      { description, done: !!selectedTask?.[1].done },
      selectedTask?.[0]
    );

    navigate('/calendar');
  };

  const HeaderButton = useMemo(
    () => (
      <Button key="home" color="inherit" onClick={homeClick}>
        Home
      </Button>
    ),
    []
  );

  return (
    <>
      <Confirmation
        opened={confirmOpened.opened}
        cancel={cancelConfirmation}
        confirm={confirm}
      >
        Do you really want to exit?
      </Confirmation>
      <HeaderBar rightItem={HeaderButton}>Create a task</HeaderBar>
      <Box
        margin={2}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '50%' }}
      >
        <TextField
          label="Task name"
          variant="outlined"
          value={name}
          onChange={nameChange}
        />
        <TextField
          label="Task description"
          value={description}
          multiline
          rows={4}
          onChange={descriptionChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Date of the task"
            inputFormat="DD/MM/YYYY"
            onChange={dateChange}
            value={date}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box
        marginX={2}
        sx={{ display: 'flex', gap: 2, justifyContent: 'end', width: '50%' }}
      >
        <Button color="secondary" variant="contained" onClick={cancelClick}>
          Cancel
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={save}
          disabled={!name || !date}
        >
          {search === '?new-task' ? 'Save' : 'Update'}
        </Button>
      </Box>
    </>
  );
};

export default TaskEditor;
