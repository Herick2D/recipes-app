import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer data-testid="footer" id="footer">
      <button id="footer-btn-Left" onClick={ () => navigate('/drinks') }>
        <img
          className="footer-img"
          src="src/images/drinkIcon.svg"
          alt="drink-button"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button id="footer-btn-Right" onClick={ () => navigate('/meals') }>
        <img
          className="footer-img"
          src="src/images/mealIcon.svg"
          alt="food-button"
          data-testid="meals-bottom-btn"
        />
      </button>
    </footer>
  );
}

export default Footer;
