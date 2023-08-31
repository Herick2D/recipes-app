import { Box, Typography } from '@mui/material';

function NotFound() {
  return (
    <Box
      sx={ { minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      } }
    >
      <Typography variant="h4">
        Page not found
      </Typography>
    </Box>
  );
}

export default NotFound;
