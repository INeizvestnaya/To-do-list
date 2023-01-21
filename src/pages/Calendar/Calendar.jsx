import './Calendar.css';

import Button from '@mui/material/Button';
import { signOut } from 'firebase/auth';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

import DaysTable from '../../components/DaysTable/DaysTable';
import DayTasks from '../../components/DayTasks';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import { NEW_TASK, SIGN_IN } from '../../constants/routes';
import { auth } from '../../firebase-config';

const GUEST = 'Guest';

const Calendar = () => {
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      navigate(SIGN_IN);
    } catch (error) {
      toast.error(error.message);
    }
  }, []);

  const addTask = () => {
    navigate(NEW_TASK);
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
        {auth.currentUser?.email || GUEST}
      </HeaderBar>
      <DaysTable />
      <DayTasks />
      <Button
        color="secondary"
        variant="contained"
        className="calendar-button"
        onClick={addTask}
      >
        Add Task
      </Button>
    </>
  );
};

export default Calendar;
