import useLocalStorage from '../../hooks/useLocalStorage';

function Profile() {
  const { value, updateValue } = useLocalStorage('user', JSON.stringify({ email: '' }));
  const { email } = JSON.parse(value);
  return (
    <h1 data-testid="profile-email">
      {email}
    </h1>
  );
}

export default Profile;
