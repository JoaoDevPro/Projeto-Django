import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dashboard from './pages/Dashboard';
import Risco from './pages/Risco';
import Notificacoes from './pages/Notificacoes';
import DemoPageContent from './components/DemoPageContent';
import Solucao from './pages/Solucao';


const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <DemoPageContent />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/solucao" element={<Solucao />} />
          <Route path="/risco" element={<Risco />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
