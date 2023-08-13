import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// Amplify
import { Auth } from 'aws-amplify';
// components
import Iconify from '../../../components/iconify';
// sections
import ForgotPasswordForm from './ForgotPasswordForm';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async () => {
    try {
      await Auth.signIn(email, password);
      navigate('/app', { replace: true });
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordForm(true);
  };

  const handleForgotPasswordFormClose = () => {
    setShowForgotPasswordForm(false);
  };

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <ForgotPasswordForm open={showForgotPasswordForm} onClose={handleForgotPasswordFormClose} />

      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover" onClick={handleForgotPasswordClick}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
