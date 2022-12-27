import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import HeaderBar from '../../components/HeaderBar/HeaderBar';

const ErrorPage = ({ user, children }) => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate(user ? '/calendar' : '/sign-in');
  };

  return (
    <>
      <HeaderBar
        rightItem={
          <Button color="inherit" onClick={redirect} key="logout">
            {user ? 'Main page' : 'Sign in'}
          </Button>
        }
      >
        Error
      </HeaderBar>
      <Typography variant="h4" align="center" margin={2}>
        {children}
      </Typography>
    </>
  );
};

ErrorPage.defaultProps = {
  user: null
};

ErrorPage.propTypes = {
  user: PropTypes.string,
  children: PropTypes.string.isRequired
};

export default ErrorPage;
