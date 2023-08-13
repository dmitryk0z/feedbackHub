import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Dialog, Typography, TextField, Button, Box, Alert, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
// Amplify
import { Auth } from 'aws-amplify';

// ----------------------------------------------------------------------

ForgotPasswordForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default function ForgotPasswordForm({ open, onClose }) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [sendCode, setSendCode] = useState(false);

  const handleSendCode = async () => {
    setError('');
    setSuccessMessage('');

    try {
      await Auth.forgotPassword(email);
      setSuccessMessage('Confirmation code sent successfully!');
      setSendCode(true);
    } catch (error) {
      setError('No account registered with this email address. Please try again.');
    }
  };

  const handleResetPassword = async () => {
    setError('');
    setSuccessMessage('');

    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
      setSuccessMessage('Password reset successful!');
    } catch (error) {
      setError('Error resetting password. Please try again.');
    }
  };

  const handleClose = () => {
    setEmail('');
    setCode('');
    setNewPassword('');
    setError('');
    setSuccessMessage('');
    setSendCode(false);
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
          Forgot Password
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!sendCode ? (
          <>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button variant="contained" onClick={handleSendCode} sx={{ mt: 1 }}>
              Send Confirmation Code
            </Button>
          </>
        ) : (
          <>
            <TextField
              label="Confirmation Code"
              variant="outlined"
              fullWidth
              value={code}
              onChange={(e) => setCode(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              label="New Password"
              variant="outlined"
              fullWidth
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button variant="contained" onClick={handleResetPassword} sx={{ mt: 1 }}>
              Reset Password
            </Button>
          </>
        )}
      </Box>
    </Dialog>
  );
}
