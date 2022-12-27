import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { auth } from '../../firebase-config';

const AuthForm = ({
  submitCallback,
  formLabel,
  linkData: { label, navigatePath }
}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const textFields = [
    {
      label: 'Email address',
      name: 'email',
      autoComplete: 'email',
      autoFocus: true,
      onChange: (event) => setEmail(event.target.value),
      value: email
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      onChange: (event) => setPassword(event.target.value),
      value: password
    }
  ];

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await submitCallback(auth, email, password);
      navigate('/calendar');
    } catch (error) {
      toast.error(error.message);

      setEmail('');
      setPassword('');
    }
  };

  return (
    <>
      <ToastContainer position="top-center" theme="colored" />
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{ width: '50%', margin: '30px auto' }}
      >
        <Typography component="h1" variant="h5">
          {formLabel}
        </Typography>
        {textFields.map((field) => (
          <TextField
            margin="normal"
            required
            fullWidth
            {...field}
            key={field.name}
          />
        ))}
        <Grid container alignItems="center">
          <Grid item xs>
            <Button
              color="secondary"
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {formLabel}
            </Button>
          </Grid>
          <Grid item>
            <Link to={navigatePath}>{label}</Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

AuthForm.propTypes = {
  submitCallback: PropTypes.func.isRequired,
  formLabel: PropTypes.string.isRequired,
  linkData: PropTypes.shape({
    label: PropTypes.string.isRequired,
    navigatePath: PropTypes.string.isRequired
  }).isRequired
};

export default AuthForm;
