import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import BottomMenu from '../../components/BottomMenu/BottomMenu';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import { CALENDAR } from '../../constants/routes';
import { selectDay, selectTask } from '../../redux/selectors';
import { setTask } from '../../redux/TasksSlice';
import classes from './TaskPage.module.css';

const TaskPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedDay = useSelector(selectDay);
  const selectedTask = useSelector(selectTask);

  const goBack = () => {
    dispatch(setTask({ task: null }));
    navigate(CALENDAR);
  };

  return (
    <>
      <HeaderBar
        leftItem={
          <IconButton onClick={goBack} className={classes.headerIcon}>
            <ArrowBackIosIcon />
          </IconButton>
        }
      >
        Today&apos;s task
      </HeaderBar>
      {selectedTask ? (
        <>
          <Box margin={2} className={classes.taskBox}>
            {selectedTask[1].done ? (
              <CheckCircleOutlineIcon color="primary" />
            ) : (
              <RadioButtonUncheckedIcon color="primary" />
            )}
            <Typography variant="h5" marginLeft={2}>
              {selectedTask[0]}
            </Typography>
          </Box>
          <Typography margin={2}>{selectedTask[1].description}</Typography>
          <BottomMenu
            selectedTask={selectedTask || undefined}
            selectedDay={selectedDay}
          />
        </>
      ) : (
        <Typography margin={2}>No task selected</Typography>
      )}
    </>
  );
};

export default TaskPage;
