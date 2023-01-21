import { signInWithEmailAndPassword } from 'firebase/auth';

import AuthForm from '../../components/AuthForm/AuthForm';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import { REGISTER } from '../../constants/routes';

const linkData = {
  label: `Don't have account? Register`,
  navigatePath: REGISTER
};

const SIGN_IN = 'Sign in';

const SignIn = () => (
  <>
    <HeaderBar>To-do list</HeaderBar>
    <AuthForm
      submitCallback={signInWithEmailAndPassword}
      formLabel={SIGN_IN}
      linkData={linkData}
    />
  </>
);

export default SignIn;
