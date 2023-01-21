import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import HeaderBar from '../../components/HeaderBar/HeaderBar';
import { CALENDAR, SIGN_IN as SIGN_IN_PATH } from '../../constants/routes';

const MAIN_PAGE = 'Main page';
const SIGN_IN = 'SIgn in';

const ErrorPage = ({ user, children }) => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate(user ? CALENDAR : SIGN_IN_PATH);
  };

  return (
    <>
      <HeaderBar
        rightItem={
          <Button color="inherit" onClick={redirect} key="logout">
            {user ? MAIN_PAGE : SIGN_IN}
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
