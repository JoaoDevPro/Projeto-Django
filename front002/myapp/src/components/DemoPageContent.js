import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Dashboard from '../pages/Dashboard';
import Risco from '../pages/Risco';
import Typography from '@mui/material/Typography';
import Solucao from '../pages/Solucao';

function DemoPageContent({ pathname }) {
  let content;
  switch (pathname) {
    case '/dashboard':
      content = <Dashboard />;
      break;
    case '/solucao':
      content = <Solucao />;
      break;
    case '/risco':
      content = <Risco />;
      break;
    default:
      content = <Typography>Página não encontrada</Typography>;
  }

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {content}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default DemoPageContent;
