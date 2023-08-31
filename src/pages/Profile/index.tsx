import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

function Profile() {
  const { value } = useLocalStorage('user', JSON.stringify({ email: '' }));
  const { email } = JSON.parse(value);
  const navigate = useNavigate();
  return (
    <>
      <h1 data-testid="profile-email">
        {email}
      </h1>
      <button
        data-testid="profile-done-btn"
        onClick={ () => navigate('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => navigate('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ () => {
          navigate('/');
          localStorage.clear();
        } }
      >
        Logout
      </button>
    </>
  );
}

export default Profile;
