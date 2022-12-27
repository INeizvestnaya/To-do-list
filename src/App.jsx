import { ThemeProvider } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider
} from 'react-router-dom';

import { auth, firestore } from './firebase-config';
import Calendar from './pages/Calendar/Calendar';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Register from './pages/Register/Register';
import SignIn from './pages/SignIn/SignIn';
import TaskEditor from './pages/TaskEditor/TaskEditor';
import TaskPage from './pages/TaskPage/TaskPage';
import { updateTasks } from './redux/TasksSlice';
import { deleteDay } from './utils/firestoreActions';
import theme from './utils/theme';

const today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(-1);

const App = () => {
  const dispatch = useDispatch();

  const allTasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    const tasksDates = Object.keys(allTasks).map((dateString) => {
      const [day, month, year] = dateString.split('.');
      return { date: new Date(+year, +month - 1, +day), dateString };
    });
    tasksDates.forEach((taskDate) => {
      if (taskDate.date < today) {
        deleteDay(taskDate.dateString);
      }
    });
  }, [allTasks]);

  const [user, setUser] = useState(auth.currentUser);

  onAuthStateChanged(auth, (userInfo) => {
    if (userInfo) {
      setUser(userInfo.uid);
    } else {
      setUser(null);
    }
  });

  useEffect(() => {
    onSnapshot(query(collection(firestore, 'tasks')), (days) => {
      const tasks = {};
      days.forEach((day) => {
        tasks[day.id] = day.data();
      });
      dispatch(updateTasks({ tasks }));
    });
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Outlet />}
        errorElement={<ErrorPage user={user}>No such page</ErrorPage>}
      >
        <Route index element={user ? <Calendar /> : <SignIn />} />
        {!user && <Route path="sign-in" element={<SignIn />} />}
        {!user && <Route path="register" element={<Register />} />}
        {user && <Route path="calendar" element={<Calendar />} />}
        {user && <Route path="task" element={<TaskPage />} />}
        {user && <Route path="task-editor" element={<TaskEditor />} />}
      </Route>
    )
  );

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
