import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider
} from 'react-router-dom';

import {
  CALENDAR,
  MAIN_PATH,
  REGISTER,
  SIGN_IN,
  TASK_EDITOR,
  TASK_PAGE
} from '../constants/routes';
import Calendar from '../pages/Calendar/Calendar';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Register from '../pages/Register/Register';
import SignIn from '../pages/SignIn/SignIn';
import TaskEditor from '../pages/TaskEditor/TaskEditor';
import TaskPage from '../pages/TaskPage/TaskPage';
import { selectUser } from '../redux/selectors';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';

const AppRoutes = () => {
  const user = useSelector(selectUser);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path={MAIN_PATH}
        element={<Outlet />}
        errorElement={<ErrorPage user={user}>No such page</ErrorPage>}
      >
        <Route index element={<Navigate to={SIGN_IN} />} />
        <Route
          path={SIGN_IN}
          element={
            <RestrictedRoute>
              <SignIn />
            </RestrictedRoute>
          }
        />
        <Route
          path={REGISTER}
          element={
            <RestrictedRoute>
              <Register />
            </RestrictedRoute>
          }
        />
        <Route
          path={CALENDAR}
          element={
            <PrivateRoute>
              <Calendar />
            </PrivateRoute>
          }
        />
        <Route
          path={TASK_PAGE}
          element={
            <PrivateRoute>
              <TaskPage />
            </PrivateRoute>
          }
        />
        <Route
          path={TASK_EDITOR}
          element={
            <PrivateRoute>
              <TaskEditor />
            </PrivateRoute>
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRoutes;
