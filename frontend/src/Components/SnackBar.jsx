import * as React from 'react';
import { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar({ message, severity }) {
  const [open, setOpen] = React.useState(false);
  const [currentMessage, setCurrentMessage] = React.useState('');

  useEffect(() => {
    if (message) {
      
      setCurrentMessage(message);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
        action={action}
        TransitionComponent={Slide}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {currentMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
