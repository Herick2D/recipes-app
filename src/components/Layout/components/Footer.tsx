import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';

function Footer() {
  return (
    <Box
      component="footer"
      data-testid="footer"
      sx={ {
        backgroundColor: '#41197F',
        padding: '10px 20px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        bottom: 0,
        position: 'fixed',
      } }
    >
      <Box
        component={ Link }
        to="/drinks"
        sx={ {
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        } }
      >
        <img
          className="footer-img"
          src="src/images/drinkIcon.svg"
          alt="drink-button"
          data-testid="drinks-bottom-btn"
        />
        <Typography variant="caption" color="primary">Drinks</Typography>
      </Box>
      <Box
        component={ Link }
        to="/about"
        sx={ {
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        } }
      >
        <InfoIcon color="primary" fontSize="medium" />
        <Typography variant="caption" color="primary">About us</Typography>
      </Box>
      <Box
        component={ Link }
        to="/meals"
        sx={ {
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        } }
      >
        <img
          className="footer-img"
          src="src/images/mealIcon.svg"
          alt="food-button"
          data-testid="meals-bottom-btn"
        />
        <Typography variant="caption" color="primary">Meals</Typography>
      </Box>
    </Box>
  );
}

export default Footer;
