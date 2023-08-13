import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Snackbar, Alert } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// sections
import { LoginForm, SignUpForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const [open, setOpen] = useState(false);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCodeConfirmationSuccess = () => {
    setShowSuccessSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setShowSuccessSnackbar(false);
  };

  return (
    <>
      <Helmet>
        <title> Login | feedbackHub </title>
      </Helmet>

      <StyledRoot>
        <Typography variant="h4" sx={{ position: 'fixed', color: '#22C066', top: { xs: 16, sm: 24, md: 40 }, left: { xs: 16, sm: 24, md: 40 } }}>
              feedbackHub .
        </Typography>

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, welcome back!
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" style={{ width: '50%', margin: '0 auto' }}/>
            <Typography variant="body1" sx={{ px: 5, mt: 5, mb: 5 }}>
              Join the community of savvy shoppers at feedbackHub and make your voice heard through insightful reviews and ratings.
            </Typography>
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to feedbackHub
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link variant="subtitle2" onClick={handleClick} sx={{ cursor: 'pointer' }}>
                Get started
              </Link>
            </Typography>
            <LoginForm />
          </StyledContent>
        </Container>
        <SignUpForm open={open} onClose={handleClose} onCodeConfirmationSuccess={handleCodeConfirmationSuccess} />
      </StyledRoot>

      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ p: 2, minWidth: 200, fontSize: '1rem', border: '1px solid #ccc' }}>
          Account created successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
