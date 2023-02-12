import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

import classes from './Confirmation.module.css';

const Confirmation = ({ children, opened, confirm, cancel }) => {
  return (
    <Dialog open={opened} onClose={cancel}>
      <DialogTitle>{children}</DialogTitle>
      <Box margin={2} className={classes.modal}>
        <Button variant="contained" color="secondary" onClick={confirm}>
          Yes
        </Button>
        <Button color="secondary" variant="contained" onClick={cancel}>
          No
        </Button>
      </Box>
    </Dialog>
  );
};

Confirmation.propTypes = {
  children: PropTypes.string.isRequired,
  opened: PropTypes.bool.isRequired,
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};

export default Confirmation;
