import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import { SIGN_IN } from '../constants/routes';
import { selectUser } from '../redux/selectors';

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to={SIGN_IN} />;
  }

  return children;
};

PrivateRoute.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired
};

export default PrivateRoute;
