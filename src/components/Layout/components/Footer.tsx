import { useNavigate } from 'react-router-dom';
import { ButtonStyled, FooterStyled } from './styles/FooterStyles';

function Footer() {
  const navigate = useNavigate();

  return (
    <FooterStyled data-testid="footer" id="footer">
      <ButtonStyled onClick={ () => navigate('/drinks') }>
        <img
          className="footer-img"
          src="src/images/drinkIcon.svg"
          alt="drink-button"
          data-testid="drinks-bottom-btn"
        />
      </ButtonStyled>
      <ButtonStyled onClick={ () => navigate('/meals') }>
        <img
          className="footer-img"
          src="src/images/mealIcon.svg"
          alt="food-button"
          data-testid="meals-bottom-btn"
        />
      </ButtonStyled>
    </FooterStyled>
  );
}

export default Footer;
