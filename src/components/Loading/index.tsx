import { Box, CircularProgress } from '@mui/material';

function Loading() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="50vh"
    >
      <CircularProgress color="primary" />
    </Box>
  );
}

export default Loading;
