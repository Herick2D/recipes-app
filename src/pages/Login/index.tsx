import { Box, Typography } from '@mui/material';
import Form from './components/Form';
import logo from '../../images/logo.svg';
import loginImg from '../../images/loginImage.svg';

function Login() {
  return (
    <Box
      component="main"
      sx={ {
        minHeight: '100vh',
        background: 'linear-gradient(#41197F 50%, #F5F5F5 50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      } }
    >
      <Box
        component="img"
        src={ logo }
        width={ 198 }
      />
      <Box
        component="img"
        src={ loginImg }
        height={ { xs: 279, md: 0 } }
      />
      <Typography
        variant="h5"
        fontWeight={ 500 }
        fontStyle="italic"
        color="secondary"
      >
        LOGIN
      </Typography>
      <Form />
    </Box>
  );
}

export default Login;
