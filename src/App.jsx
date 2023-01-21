import { ThemeProvider } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { auth, firestore } from './firebase-config';
import LoadingPage from './pages/LoadingPage';
import { selectAllTasks } from './redux/selectors';
import { updateTasks } from './redux/TasksSlice';
import { setUser as setUserAction } from './redux/UserSlice';
import AppRoutes from './routes/AppRoutes';
import { deleteDay } from './utils/firestoreActions';
import getToday from './utils/getToday';
import theme from './utils/theme';

const App = () => {
  const dispatch = useDispatch();

  const allTasks = useSelector(selectAllTasks);

  const [user, setUser] = useState(auth.currentUser?.uid);
  const [loading, setLoading] = useState(true);
  const [tasksLoaded, setTasksLoaded] = useState(false);

  useEffect(() => {
    const tasksDates = Object.keys(allTasks).map((dateString) => {
      const [day, month, year] = dateString.split('.');
      return { date: new Date(+year, +month - 1, +day), dateString };
    });

    tasksDates.forEach((taskDate) => {
      if (taskDate.date < getToday()) {
        deleteDay(user, taskDate.dateString);
      }
    });
  }, [allTasks]);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (userInfo) => {
      if (tasksLoaded) {
        setLoading(false);
      }

      if (userInfo) {
        setUser(userInfo.uid);
        dispatch(setUserAction({ user: userInfo.uid }));
      } else {
        setUser(null);
        dispatch(setUserAction({ user: null }));
      }
    });
  }, []);

  useEffect(() => {
    let unsubscribe = null;
    if (user) {
      setLoading(true);
      unsubscribe = onSnapshot(
        query(collection(firestore, `users/${user}/tasks`)),
        (days) => {
          const tasks = {};
          days.forEach((day) => {
            tasks[day.id] = day.data();
          });
          dispatch(updateTasks({ tasks }));
          setLoading(false);
          setTasksLoaded(true);
        }
      );
    }

    return () => unsubscribe?.();
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      {loading ? <LoadingPage /> : <AppRoutes />}
    </ThemeProvider>
  );
};

export default App;
