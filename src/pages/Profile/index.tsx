import useLocalStorage from '../../hooks/useLocalStorage';

function Profile() {
  const { value, updateValue } = useLocalStorage('user', JSON.stringify({ email: '' }));
  const { email } = JSON.parse(value);
  return (
    <>
      <h1 data-testid="profile-email">
        {email}
      </h1>
      <button data-testid="profile-done-btn">
        Done Recipes
      </button>
      <button data-testid="profile-favorite-btn">
        Favorite Recipes
      </button>
      <button data-testid="profile-logout-btn">
        Logout
      </button>
    </>
  );
}

export default Profile;
