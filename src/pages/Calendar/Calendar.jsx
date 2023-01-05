import Button from '@mui/material/Button';
import { signOut } from 'firebase/auth';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

import DaysTable from '../../components/DaysTable/DaysTable';
import DayTasks from '../../components/DayTasks';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import { auth } from '../../firebase-config';
import { selectDay as SelectDayAction } from '../../redux/TasksSlice';

const Calendar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);
  const selectedDay = useSelector((state) => state.tasks.selectedDay);

  const selectDay = (day) => {
    dispatch(SelectDayAction({ day: day.toLocaleDateString() }));
  };

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      navigate('/sign-in');
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const addTask = () => {
    navigate('/task-editor?new-task');
  };

  const HeaderButton = useMemo(
    () => (
      <Button color="inherit" onClick={logout} key="logout">
        Logout
      </Button>
    ),
    []
  );

  return (
    <>
      <ToastContainer position="top-center" theme="colored" />
      <HeaderBar rightItem={HeaderButton}>
        {auth.currentUser?.email || 'Guest'}
      </HeaderBar>
      <DaysTable selectDay={selectDay} tasks={tasks} />
      <DayTasks dayTasks={tasks[selectedDay]} />
      <Button
        color="secondary"
        variant="contained"
        sx={{ margin: 2 }}
        onClick={addTask}
      >
        Add Task
      </Button>
    </>
  );
};

export default Calendar;
