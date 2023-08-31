import { useNavigate } from 'react-router-dom';
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import useLocalStorage from '../../hooks/useLocalStorage';
import doneRecipesIcon from '../../images/doneRecipesIcon.svg';
import favoriteRecipesIcon from '../../images/favoriteRecipesIcon.svg';
import logoutIcon from '../../images/logoutIcon.svg';

function Profile() {
  const { value } = useLocalStorage('user', JSON.stringify({ email: '' }));
  const { email } = JSON.parse(value);
  const navigate = useNavigate();
  return (
    <Stack
      spacing={ 4 }
      component="main"
      direction="column"
      alignItems="center"
    >
      <Typography
        variant="h2"
        fontSize={ 18 }
        fontWeight={ 700 }
        data-testid="profile-email"
      >
        {email}
      </Typography>
      <Stack spacing={ 1 } width={ 310 } alignItems="flex-start" p={ 5 }>
        <IconButton
          data-testid="profile-done-btn"
          onClick={ () => navigate('/done-recipes') }
          sx={ {
            borderRadius: 0,
            gap: 2,
          } }
        >
          <Box component="img" src={ doneRecipesIcon } />
          <Typography
            variant="h5"
            fontSize={ { xs: 18, md: 20 } }
          >
            Done Recipes
          </Typography>
        </IconButton>
        <Box component={ Divider } sx={ { border: '1px solid grey' } } width="100%" />
        <IconButton
          data-testid="profile-favorite-btn"
          onClick={ () => navigate('/favorite-recipes') }
          sx={ {
            borderRadius: 0,
            gap: 2,
          } }
        >
          <Box component="img" src={ favoriteRecipesIcon } />
          <Typography
            variant="h5"
            fontSize={ { xs: 18, md: 20 } }
          >
            Favorite Recipes
          </Typography>
        </IconButton>
        <Box component={ Divider } sx={ { border: '1px solid grey' } } width="100%" />
        <IconButton
          data-testid="profile-logout-btn"
          onClick={ () => {
            navigate('/');
            localStorage.clear();
          } }
          sx={ {
            borderRadius: 0,
            gap: 2,
          } }
        >
          <Box component="img" src={ logoutIcon } />
          <Typography
            variant="h5"
            fontSize={ { xs: 18, md: 20 } }
          >
            Logout
          </Typography>
        </IconButton>
      </Stack>
    </Stack>
  );
}

export default Profile;
