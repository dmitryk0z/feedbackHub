import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Dialog, Typography, TextField, Button, Box, IconButton, Alert } from '@mui/material';
import { Close } from '@mui/icons-material';
// Amplify
import { Auth } from 'aws-amplify';

// ----------------------------------------------------------------------

CodeConfirmationForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  username: PropTypes.string,
  onSuccess: PropTypes.func,
};

export default function CodeConfirmationForm({ open, onClose, username, onSuccess }) {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [message, setMessage] = useState('');
  const [resendError, setResendError] = useState('');

  const handleConfirmationCodeChange = (event) => {
    setConfirmationCode(event.target.value);
  };

  const handleConfirmSignUp = async () => {
    setMessage('');

    try {
      await Auth.confirmSignUp(username, confirmationCode);
      onSuccess();
      onClose();
    } catch (error) {
      setMessage('Invalid confirmation code. Please try again.');
    }
  };

  const handleResendCode = async () => {
    setResendError('');

    try {
      await Auth.resendSignUp(username);
      setMessage('Code resent successfully!');
    } catch (error) {
      setResendError('Error resending confirmation code. Please try again.');
    }
  };

  const handleClose = () => {
    setConfirmationCode('');
    setMessage('');
    setResendError('');
    onClose();
  };

  return (
    <Dialog open={open}>
      <Box sx={{ p: 4 }}>
        <IconButton
          aria-label="Close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            color: 'text.secondary',
          }}
        >
          <Close />
        </IconButton>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Enter Confirmation Code
        </Typography>
        {message && (
          <Alert severity={message.includes('Invalid') ? 'error' : 'success'} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        {resendError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {resendError}
          </Alert>
        )}
        <TextField
          label="Confirmation Code"
          variant="outlined"
          fullWidth
          value={confirmationCode}
          onChange={handleConfirmationCodeChange}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleConfirmSignUp} sx={{ mt: 1 }}>
          Confirm Sign Up
        </Button>
        <Button variant="text" onClick={handleResendCode} sx={{ mt: 1, ml: 1 }}>
          Resend Code
        </Button>
      </Box>
    </Dialog>
  );
}
