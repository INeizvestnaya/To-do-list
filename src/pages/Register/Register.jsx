import { createUserWithEmailAndPassword } from 'firebase/auth';

import AuthForm from '../../components/AuthForm/AuthForm';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import { SIGN_IN } from '../../constants/routes';

const linkData = {
  label: 'Already have an account? Sign in',
  navigatePath: SIGN_IN
};

const REGISTER = 'Register';

const Register = () => (
  <>
    <HeaderBar>To-do list</HeaderBar>
    <AuthForm
      submitCallback={createUserWithEmailAndPassword}
      formLabel={REGISTER}
      linkData={linkData}
    />
  </>
);

export default Register;
