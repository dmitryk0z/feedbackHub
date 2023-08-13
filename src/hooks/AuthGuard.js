import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui
import { CircularProgress } from '@mui/material';
// Amplify
import { Auth } from 'aws-amplify';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const isAuthenticated = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      return true; // User is authenticated
    } catch (error) {
      return false; // User is not authenticated
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await isAuthenticated();
      setLoading(false);

      if (!authenticated) {
        // User is not authenticated, redirect to the login page
        navigate('/login', { replace: true });
      }
    };

    checkAuthentication();
  }, [navigate]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  // Render the children if the user is authenticated
  return <>{children}</>;
};
