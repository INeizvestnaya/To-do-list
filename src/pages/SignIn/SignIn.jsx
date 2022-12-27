import { signInWithEmailAndPassword } from 'firebase/auth';

import AuthForm from '../../components/AuthForm/AuthForm';
import HeaderBar from '../../components/HeaderBar/HeaderBar';

const linkData = {
  label: `Don't have account? Register`,
  navigatePath: '/register'
};

const SignIn = () => (
  <>
    <HeaderBar>To-do list</HeaderBar>
    <AuthForm
      submitCallback={signInWithEmailAndPassword}
      formLabel="Sign in"
      linkData={linkData}
    />
  </>
);

export default SignIn;
