import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../../../images/profileIcon.svg';
import searchIcon from '../../../images/searchIcon.svg';

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(false);

  return (
    <header>
      {pathname === '/meals' && (
        <>
          <h1 data-testid="page-title">Meals</h1>
          <button onClick={ () => navigate('/profile') }>
            <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
          </button>
          <button onClick={ () => setSearchInput(!searchInput) }>
            <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />
          </button>
          {searchInput && (
            <SearchBar pathname={ pathname } />
          )}
        </>
      )}
      {pathname === '/drinks' && (
        <>
          <h1 data-testid="page-title">Drinks</h1>
          <button onClick={ () => navigate('/profile') }>
            <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
          </button>
          <button onClick={ () => setSearchInput(!searchInput) }>
            <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />
          </button>
          {searchInput && (
            <SearchBar
              pathname={ pathname }
            />
          )}
        </>
      )}
      {pathname === '/profile' && (
        <>
          <h1 data-testid="page-title">Profile</h1>
          <button onClick={ () => navigate('/profile') }>
            <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
          </button>
        </>
      )}
      {pathname === '/done-recipes' && (
        <>
          <h1 data-testid="page-title">Done Recipes</h1>
          <button onClick={ () => navigate('/profile') }>
            <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
          </button>
        </>
      )}
      {pathname === '/favorite-recipes' && (
        <>
          <h1 data-testid="page-title">Favorite Recipes</h1>
          <button onClick={ () => navigate('/profile') }>
            <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
