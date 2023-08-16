import { Outlet, Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function SimpleLayout() {
  return (
    <>
      <Link to="/app/products" component={RouterLink} sx={{ display: 'contents' }}>
        <Typography variant="h4" sx={{ position: 'fixed', color: '#22C066', top: { xs: 16, sm: 24, md: 40 }, left: { xs: 16, sm: 24, md: 40 } }}>
              feedbackHub .
        </Typography>
      </Link>

      <Outlet />
    </>
  );
}
