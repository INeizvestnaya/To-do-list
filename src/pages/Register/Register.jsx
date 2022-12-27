import { createUserWithEmailAndPassword } from 'firebase/auth';

import AuthForm from '../../components/AuthForm/AuthForm';
import HeaderBar from '../../components/HeaderBar/HeaderBar';

const linkData = {
  label: 'Already have an account? Sign in',
  navigatePath: '/sign-in'
};

const Register = () => (
  <>
    <HeaderBar>To-do list</HeaderBar>
    <AuthForm
      submitCallback={createUserWithEmailAndPassword}
      formLabel="Register"
      linkData={linkData}
    />
  </>
);

export default Register;
