import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

const Confirmation = ({ children, opened, confirm, cancel }) => {
  return (
    <Dialog open={opened} onClose={cancel}>
      <DialogTitle>{children}</DialogTitle>
      <Box margin={2} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={confirm}
          sx={{ marginRight: 2 }}
        >
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
