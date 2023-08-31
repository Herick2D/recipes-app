import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, IconButton, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import profileIcon from '../../../images/profileIcon.svg';
import searchIcon from '../../../images/searchIcon.svg';
import logoHeader from '../../../images/logoHeader.svg';
import mealIcon from '../../../images/mealIcon.svg';
import drinkIcon from '../../../images/drinkIcon.svg';
import profileIconTitle from '../../../images/profileIconTitle.svg';
import favoriteRecipesIcon from '../../../images/favoriteRecipesIcon.svg';
import doneRecipesIcon from '../../../images/doneRecipesIcon.svg';

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(false);

  const SPACE_BETWEEN = 'space-between';

  return (
    <Box component="header" sx={ { display: 'flex', flexDirection: 'column' } }>
      {pathname === '/meals' && (
        <>
          <Box
            sx={ {
              backgroundColor: '#FCDC36',
              display: 'flex',
              justifyContent: SPACE_BETWEEN,
              padding: 1,
            } }
          >
            <Button onClick={ () => navigate('/meals') }>
              <img src={ logoHeader } alt="logo Header" />
            </Button>
            <Box>
              <IconButton onClick={ () => setSearchInput(!searchInput) }>
                <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />
              </IconButton>
              <IconButton onClick={ () => navigate('/profile') }>
                <img
                  src={ profileIcon }
                  alt="profile icon"
                  data-testid="profile-top-btn"
                />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={ {
              padding: '30px 0',
              textAlign: 'center',
            } }
          >
            <img src={ mealIcon } alt="meals logo" />
            <Typography
              variant="h5"
              color="secondary"
              fontWeight={ 700 }
              data-testid="page-title"
            >
              Meals
            </Typography>
          </Box>
          {searchInput && (
            <SearchBar pathname={ pathname } />
          )}
        </>
      )}
      {pathname === '/drinks' && (
        <>
          <Box
            sx={ {
              backgroundColor: '#FCDC36',
              display: 'flex',
              justifyContent: SPACE_BETWEEN,
              padding: 1,
            } }
          >
            <Button onClick={ () => navigate('/meals') }>
              <img src={ logoHeader } alt="logo Header" />
            </Button>
            <Box>
              <IconButton onClick={ () => setSearchInput(!searchInput) }>
                <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />
              </IconButton>
              <IconButton onClick={ () => navigate('/profile') }>
                <img
                  src={ profileIcon }
                  alt="profile icon"
                  data-testid="profile-top-btn"
                />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={ {
              padding: '30px 0',
              textAlign: 'center',
            } }
          >
            <img src={ drinkIcon } alt="meals logo" />
            <Typography
              variant="h5"
              color="secondary"
              fontWeight={ 700 }
              data-testid="page-title"
            >
              Drinks
            </Typography>
          </Box>
          {searchInput && (
            <SearchBar pathname={ pathname } />
          )}
        </>
      )}
      {pathname === '/profile' && (
        <>
          <Box
            sx={ {
              backgroundColor: '#FCDC36',
              display: 'flex',
              justifyContent: SPACE_BETWEEN,
              padding: 1,
            } }
          >
            <Button onClick={ () => navigate('/meals') }>
              <img src={ logoHeader } alt="logo Header" />
            </Button>
            <Box>
              <IconButton onClick={ () => navigate('/profile') }>
                <img
                  src={ profileIcon }
                  alt="profile icon"
                  data-testid="profile-top-btn"
                />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={ {
              padding: '30px 0',
              textAlign: 'center',
            } }
          >
            <Box component="img" src={ profileIconTitle } alt="meals logo" />
            <Typography
              variant="h5"
              color="secondary"
              fontWeight={ 700 }
              data-testid="page-title"
              mt={ 1 }
            >
              Profile
            </Typography>
          </Box>
        </>
      )}
      {pathname === '/done-recipes' && (
        <>
          <Box
            sx={ {
              backgroundColor: '#FCDC36',
              display: 'flex',
              justifyContent: SPACE_BETWEEN,
              padding: 1,
            } }
          >
            <Button onClick={ () => navigate('/meals') }>
              <img src={ logoHeader } alt="logo Header" />
            </Button>
            <Box>
              <IconButton onClick={ () => navigate('/profile') }>
                <img
                  src={ profileIcon }
                  alt="profile icon"
                  data-testid="profile-top-btn"
                />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={ {
              padding: '30px 0',
              textAlign: 'center',
            } }
          >
            <Box component="img" src={ doneRecipesIcon } alt="meals logo" />
            <Typography
              variant="h5"
              color="secondary"
              fontWeight={ 700 }
              data-testid="page-title"
              mt={ 1 }
            >
              DONE RECIPES
            </Typography>
          </Box>
        </>
      )}
      {pathname === '/favorite-recipes' && (
        <>
          <Box
            sx={ {
              backgroundColor: '#FCDC36',
              display: 'flex',
              justifyContent: SPACE_BETWEEN,
              padding: 1,
            } }
          >
            <Button onClick={ () => navigate('/meals') }>
              <img src={ logoHeader } alt="logo Header" />
            </Button>
            <Box>
              <IconButton onClick={ () => navigate('/profile') }>
                <img
                  src={ profileIcon }
                  alt="profile icon"
                  data-testid="profile-top-btn"
                />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={ {
              padding: '30px 0',
              textAlign: 'center',
            } }
          >
            <Box component="img" src={ favoriteRecipesIcon } alt="meals logo" />
            <Typography
              variant="h5"
              color="secondary"
              fontWeight={ 700 }
              data-testid="page-title"
              mt={ 1 }
            >
              FAVORITES RECIPES
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Header;
