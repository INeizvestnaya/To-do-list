/* eslint-disable consistent-return */

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import Confirmation from '../../components/Confirmation';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import { CALENDAR } from '../../constants/routes';
import { selectDay, selectTask, selectUser } from '../../redux/selectors';
import { setDay, setTask } from '../../redux/TasksSlice';
import { addTask } from '../../utils/firestoreActions';
import getToday from '../../utils/getToday';
import classes from './TaskEditor.module.css';

const getFormattedDate = (day) => {
  const dayItems = day.split('.');
  return dayjs(`${dayItems[2]}-${dayItems[1]}-${dayItems[0]}`);
};

const getDateErrorMessage = (error) => {
  if (!error) {
    return;
  }

  if (error.type === 'validate') {
    return 'Enter valid date!';
  }

  return error.message;
};

const isDateValid = (date) =>
  date.isValid() &&
  date.toDate() < new Date(2100, 0, 1) &&
  date.toDate() > getToday();

const NEW_TASK = '?new-task';
const SAVE = 'Save';
const UPDATE = 'Update';
const DATE_FORMAT = 'DD.MM.YYYY';
const DATE_INPUT_FORMAT = 'DD/MM/YYYY';

const TaskEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { search } = useLocation();

  const selectedTask = useSelector(selectTask);
  const selectedDay = useSelector(selectDay);
  const user = useSelector(selectUser);

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      name: selectedTask?.[0] || '',
      description: selectedTask?.[1].description || '',
      date: getFormattedDate(selectedDay)
    }
  });

  const [confirmOpened, setConfirmOpened] = useState({ opened: false });

  const changeConfirmState = (opened, home) => {
    setConfirmOpened({ opened, home });
  };

  const homeClick = useCallback(() => {
    changeConfirmState(true, true);
  }, []);

  const cancelClick = () => {
    changeConfirmState(true, false);
  };

  const cancelConfirmation = () => {
    changeConfirmState(false, false);
  };

  const unselectTask = () => dispatch(setTask({ task: null }));

  const confirm = () => {
    if (confirmOpened.home) {
      unselectTask();
      navigate(CALENDAR);
    } else {
      navigate(-1);
    }
  };

  const save = ({ name, description, date }) => {
    const newTaskDate = date.format(DATE_FORMAT);
    const prevDate = search !== NEW_TASK ? selectedDay : null;

    unselectTask();
    dispatch(setDay({ day: newTaskDate }));
    addTask(
      user,
      newTaskDate,
      name,
      { description, done: !!selectedTask?.[1].done },
      selectedTask?.[0],
      prevDate
    );

    navigate(CALENDAR);
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
      <Box className={classes.box}>
        <Box
          component="form"
          onSubmit={handleSubmit(save)}
          margin={2}
          className={classes.form}
        >
          <Controller
            name="name"
            control={control}
            rules={{
              required: { value: true, message: 'Enter name of the task!' }
            }}
            render={({ field }) => (
              <TextField label="Task name" variant="outlined" {...field} />
            )}
          />
          <Typography variant="caption" color="error">
            {errors.name?.message}
          </Typography>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                label="Task description"
                variant="outlined"
                multiline
                rows={4}
                {...field}
              />
            )}
          />
          <Controller
            name="date"
            control={control}
            rules={{
              required: { value: true, message: 'Enter date of the task!' },
              validate: isDateValid
            }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Date of the task"
                  inputFormat={DATE_INPUT_FORMAT}
                  className={classes.dateInput}
                  renderInput={(params) => <TextField {...params} />}
                  {...field}
                />
              </LocalizationProvider>
            )}
          />
          <Typography variant="caption" color="error">
            {getDateErrorMessage(errors.date)}
          </Typography>
          <Box marginX={2} className={classes.buttons}>
            <Button color="secondary" variant="contained" onClick={cancelClick}>
              Cancel
            </Button>
            <Button color="secondary" variant="contained" type="submit">
              {search === NEW_TASK ? SAVE : UPDATE}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TaskEditor;
