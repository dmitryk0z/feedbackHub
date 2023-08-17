import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Dialog, Typography, TextField, Button, Box, IconButton, Alert } from '@mui/material';
import { Close } from '@mui/icons-material';
// Amplify
import { Auth } from 'aws-amplify';
// sections
import CodeConfirmationForm from './CodeConfirmationForm';

// ----------------------------------------------------------------------

SignUpForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onCodeConfirmationSuccess: PropTypes.func,
};

export default function SignUpForm({ open, onClose, onCodeConfirmationSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [showCodeConfirmation, setShowCodeConfirmation] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setFirstNameError(false);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setLastNameError(false);
  };

  const validateForm = () => {
    let isValid = true;

    // Validate email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError(true);
      isValid = false;
    }

    // Validate password
    if (!/(?=.*[a-z])/.test(password)) {
      setPasswordError('Password should include lowercase characters');
      isValid = false;
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      setPasswordError('Password should include uppercase characters');
      isValid = false;
    }
    if (!/(?=.*[0-9])/.test(password)) {
      setPasswordError('Password should include numerals');
      isValid = false;
    }
    if (!/(?=.*[!@#$%^&*()\-_=+[\]{}|;:'",.<>?/~`\\])/.test(password)) {
      setPasswordError('Password should include special characters');
      isValid = false;
    }
    if (password.length < 8) {
      setPasswordError('Password should be at least 8 characters long');
      isValid = false;
    }

    // Validate first name
    if (!firstName) {
      setFirstNameError(true);
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(firstName)) {
      setFirstNameError(true);
      isValid = false;
    }

    // Validate last name
    if (!lastName) {
      setLastNameError(true);
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(lastName)) {
      setLastNameError(true);
      isValid = false;
    }

    return isValid;
  };

  const handleCreateAccount = async () => {
    // Reset error states
    setError('');
    setEmailError(false);
    setPasswordError(false);
    setFirstNameError(false);
    setLastNameError(false);

    // Validate form inputs
    if (!validateForm()) {
      setError('Please provide valid input for all fields');
      return;
    }

    try {
      // Sign up with Amplify Auth
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          given_name: firstName,
          family_name: lastName,
        },
      });

      setShowCodeConfirmation(true);
    } catch (error) {
      // Display error message
      setError(error.message);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setError('');
    setEmailError(false);
    setPasswordError(false);
    setFirstNameError(false);
    setLastNameError(false);
    setShowCodeConfirmation(false);
    onClose();
  };

  return (
    <>
      {!showCodeConfirmation && (
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
              Create an Account
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              sx={{ mb: 2 }}
            />
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={handleFirstNameChange}
              error={firstNameError}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={handleLastNameChange}
              error={lastNameError}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={handlePasswordChange}
              error={Boolean(passwordError)}
              helperText={passwordError}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleCreateAccount} sx={{ mt: 1 }}>
              Create Account
            </Button>
          </Box>
        </Dialog>
      )}

      <CodeConfirmationForm
        open={showCodeConfirmation}
        onClose={handleClose}
        username={email}
        onSuccess={onCodeConfirmationSuccess}
      />
    </>
  );
}
