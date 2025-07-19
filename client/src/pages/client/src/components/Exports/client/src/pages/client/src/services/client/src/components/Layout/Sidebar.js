import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  Typography
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Language as DomainIcon,
  Phone as PhoneIcon,
  Settings as SettingsIcon,
  History as HistoryIcon,
  Assessment as ReportsIcon
} from '@mui/icons-material';

const Sidebar = ({ open, onClose, width }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard'
    },
    {
      text: 'Person Search',
      icon: <PersonIcon />,
      path: '/search/person'
    },
    {
      text: 'Email Investigation',
      icon: <EmailIcon />,
      path: '/search/email'
    },
    {
      text: 'Domain Analysis',
      icon: <DomainIcon />,
      path: '/search/domain'
    },
    {
      text: 'Phone Lookup',
      icon: <PhoneIcon />,
      path: '/search/phone'
    },
  ];

  const secondaryItems = [
    {
      text: 'Search History',
      icon: <HistoryIcon />,
      path: '/history'
    },
    {
      text: 'Reports',
      icon: <ReportsIcon />,
      path: '/reports'
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings'
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ my: 1 }} />
        
        <List>
          {secondaryItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" color="textSecondary">
            OSINT Platform v1.0
          </Typography>
          <br />
          <Typography variant="caption" color="textSecondary">
            User: BBJreed
          </Typography>
          <br />
          <Typography variant="caption" color="textSecondary">
            Updated: 2025-07-19
          </Typography>
        </Box>
      </Box>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: width }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: width },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: width },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
