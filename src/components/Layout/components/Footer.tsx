function Footer() {
  return (
    <footer data-testid="footer" id="footer">
      <button data-testid="drinks-bottom-btn" id="footer-btn-Left">
        <img src="src/images/drinkIcon.svg" alt="drink-button" />
      </button>
      <button data-testid="meals-bottom-btn" id="footer-btn-Right">
        <img src="src/images/mealIcon.svg" alt="food-button" />
      </button>
    </footer>
  );
}

export default Footer;
