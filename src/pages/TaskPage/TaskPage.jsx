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
import { selectTask } from '../../redux/TasksSlice';

const TaskPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedDay = useSelector((state) => state.tasks.selectedDay);
  const selectedTask = useSelector((state) => state.tasks.selectedTask);

  const goBack = () => {
    dispatch(selectTask({ task: null }));
    navigate('/calendar');
  };

  return (
    <>
      <HeaderBar
        leftItem={
          <IconButton key="back" onClick={goBack} sx={{ color: 'white' }}>
            <ArrowBackIosIcon />
          </IconButton>
        }
      >
        Today&apos;s task
      </HeaderBar>
      {selectedTask ? (
        <>
          <Box margin={2} sx={{ display: 'flex', alignItems: 'center' }}>
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
