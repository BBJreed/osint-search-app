import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';

// Layout Components
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import PersonSearch from './pages/PersonSearch';
import EmailInvestigation from './pages/EmailInvestigation';
import DomainAnalysis from './pages/DomainAnalysis';
import Settings from './pages/Settings';

// Context
import { SearchProvider } from './context/SearchContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

const SIDEBAR_WIDTH = 240;

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user] = useState({
    name: 'BBJreed',
    email: 'bbjreed@example.com',
    avatar: '/api/placeholder/40/40',
    lastLogin: '2025-07-19 02:07:22 UTC'
  });

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SearchProvider>
        <Router>
          <Box sx={{ display: 'flex' }}>
            {/* Navigation Bar */}
            <Navbar 
              onMenuClick={handleSidebarToggle}
              user={user}
            />
            
            {/* Sidebar */}
            <Sidebar 
              open={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              width={SIDEBAR_WIDTH}
            />
            
            {/* Main Content */}
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 0,
                width: { sm: `calc(100% - ${sidebarOpen ? SIDEBAR_WIDTH : 0}px)` },
                ml: { sm: sidebarOpen ? `${SIDEBAR_WIDTH}px` : 0 },
                mt: '64px', // Account for navbar height
                minHeight: 'calc(100vh - 64px)',
                backgroundColor: 'background.default',
                transition: theme.transitions.create(['margin', 'width'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
              }}
            >
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/search/person" element={<PersonSearch />} />
                <Route path="/search/email" element={<EmailInvestigation />} />
                <Route path="/search/domain" element={<DomainAnalysis />} />
                <Route path="/settings" element={<Settings />} />
                
                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
