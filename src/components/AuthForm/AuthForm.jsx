import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { CALENDAR } from '../../constants/routes';
import { auth } from '../../firebase-config';
import classes from './AuthForm.module.css';

const emailRules = {
  required: { value: true, message: 'Enter email address!' },
  pattern: {
    value: /^\S+?@\w+?\.\w+?$/,
    message: 'Enter valid email address!'
  }
};

const passwordRules = {
  required: { value: true, message: 'Enter password!' },
  minLength: {
    value: 7,
    message: 'Password must contain at least 7 characters!'
  }
};

const AuthForm = ({
  submitCallback,
  formLabel,
  linkData: { label, navigatePath }
}) => {
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const submitHandler = async ({ email, password }) => {
    try {
      await submitCallback(auth, email, password);
      navigate(CALENDAR);
    } catch (error) {
      toast.error(error.message);
      reset();
    }
  };

  const inputs = [
    {
      name: 'email',
      rules: emailRules,
      label: 'Email',
      autoFocus: true,
      type: 'text',
      errorLabel: errors.email?.message
    },
    {
      name: 'password',
      rules: passwordRules,
      label: 'Password',
      autoFocus: false,
      type: 'password',
      errorLabel: errors.password?.message
    }
  ];

  return (
    <>
      <ToastContainer position="top-center" theme="colored" />
      <Box
        component="form"
        onSubmit={handleSubmit(submitHandler)}
        className={classes.box}
      >
        <Typography component="h1" variant="h5">
          {formLabel}
        </Typography>
        {inputs.map((input) => (
          <Fragment key={input.name}>
            <Controller
              name={input.name}
              control={control}
              rules={input.rules}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  label={input.label}
                  autoFocus={input.autoFocus}
                  type={input.type}
                  {...field}
                />
              )}
            />
            <Typography variant="caption" color="error">
              {input.errorLabel}
            </Typography>
          </Fragment>
        ))}
        <Grid marginTop={2} container alignItems="center">
          <Grid item xs>
            <Button color="secondary" type="submit" variant="contained">
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
