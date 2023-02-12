import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import { CALENDAR } from '../constants/routes';
import { selectUser } from '../redux/selectors';

const RestrictedRoute = ({ children }) => {
  const user = useSelector(selectUser);

  if (user) {
    return <Navigate to={CALENDAR} />;
  }

  return children;
};

RestrictedRoute.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired
};

export default RestrictedRoute;
