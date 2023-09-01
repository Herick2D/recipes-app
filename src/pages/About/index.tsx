import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, Button, Grid, IconButton, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import profileIcon from '../../images/profileIcon.svg';
import logoHeader from '../../images/logoHeader.svg';

const teams = [
  {
    name: 'Leonardo Brandão',
    linkedin: 'leonardocbrand',
    github: 'leonardocbrand',
  },
  {
    name: 'Herick Moreira',
    linkedin: 'herick-moreira',
    github: 'Herick2D',
  },
  {
    name: 'Matheus Bandeira',
    linkedin: 'mathban',
    github: 'mathban',
  },
  {
    name: 'Rodrigo Matos',
    linkedin: 'rodrigodrmatos',
    github: 'rodrigodrmatos',
  },
  {
    name: 'Danilo Bertolini',
    linkedin: 'danilobertolini',
    github: 'danilobertolini',
  },
];
function About() {
  const navigate = useNavigate();

  return (
    <div className="pb-50">
      <Box
        sx={ {
          backgroundColor: '#FCDC36',
          display: 'flex',
          justifyContent: 'space-between',
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
        <InfoIcon fontSize="large" color="primary" />
        <Typography
          variant="h5"
          color="secondary"
          fontWeight={ 700 }
          data-testid="page-title"
          mt={ 1 }
        >
          ABOUT US
        </Typography>
      </Box>
      <Grid
        container
        spacing={ 2 }
        sx={ { paddingBottom: '80px', minHeight: '80vh', alignItems: 'center' } }
      >
        {teams.map(({ name, linkedin, github }) => (
          <Grid
            sx={ { display: 'flex', justifyContent: 'center' } }
            item
            xs={ 12 }
            md={ 6 }
            xl={ 3 }
            key={ name }
          >
            <Paper
              elevation={ 10 }
              sx={ {
                width: '350',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
              } }
            >
              <img className="about-avatar" width={ 280 } src={ `https://avatars.githubusercontent.com/${github}?size=280` } alt="logo1" />
              <Typography variant="h6" fontWeight={ 700 }>{name}</Typography>
              <Box>
                <a id={ github } href={ `https://github.com/${github}` } target="blank">
                  <GitHubIcon className="about-icon" fontSize="large" color="primary" />
                </a>

                <a href={ `https://www.linkedin.com/in/${linkedin}` } target="blank">
                  <LinkedInIcon fontSize="large" color="primary" />
                </a>
              </Box>
            </Paper>
          </Grid>))}
      </Grid>
    </div>
  );
}

export default About;
