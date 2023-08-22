import { styled } from '@mui/material';

export const FooterStyled = styled('footer')({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  backgroundColor: '#41197F',
  color: 'black',
  textAlign: 'center',
});

export const ButtonStyled = styled('button')({
  backgroundColor: 'transparent',
  border: 'none',
  color: 'white',
  padding: '16px 32px',
  textAlign: 'center',
  fontSize: '16px',
  borderRadius: '12px',
  margin: '4px 2px',
  cursor: 'pointer',
  marginLeft: '20px',
});
