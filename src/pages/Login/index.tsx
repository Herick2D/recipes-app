import { Box } from '@mui/material';
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
        justifyContent: 'space-around',
      } }
    >
      <Box
        component="img"
        src={ logo }
        width={ 198 }
        alt="login-logo"
      />
      <Box
        component="img"
        src={ loginImg }
        alt="login-logo"
        sx={ {
          display: { xs: 'flex', md: 'none' },
          position: 'absolute',
          left: 0,
          bottom: '35%',
          height: '250px',
        } }
      />
      <Form />
    </Box>
  );
}

export default Login;
