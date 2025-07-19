import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  Person as PersonIcon,
  Language as DomainIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Assessment as AnalyticsIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSearches: 0,
    activeInvestigations: 0,
    dataSourcesConnected: 12,
    recentSearches: []
  });

  const searchTypes = [
    { type: 'person', label: 'Person Search', icon: PersonIcon, count: 45 },
    { type: 'domain', label: 'Domain Analysis', icon: DomainIcon, count: 23 },
    { type: 'email', label: 'Email Investigation', icon: EmailIcon, count: 31 },
    { type: 'phone', label: 'Phone Lookup', icon: PhoneIcon, count: 18 }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        OSINT Dashboard
      </Typography>
      
      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Searches
              </Typography>
              <Typography variant="h4">
                {stats.totalSearches}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Cases
              </Typography>
              <Typography variant="h4">
                {stats.activeInvestigations}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Data Sources
              </Typography>
              <Typography variant="h4">
                {stats.dataSourcesConnected}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Success Rate
              </Typography>
              <Typography variant="h4">94%</Typography>
              <LinearProgress variant="determinate" value={94} sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Search Actions */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Search
              </Typography>
              <Grid container spacing={2}>
                {searchTypes.map((search) => (
                  <Grid item xs={12} sm={6} key={search.type}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<search.icon />}
                      sx={{ p: 2, justifyContent: 'flex-start' }}
                    >
                      <Box sx={{ textAlign: 'left', width: '100%' }}>
                        <Typography variant="body1">{search.label}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {search.count} recent searches
                        </Typography>
                      </Box>
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar><PersonIcon /></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Person Search"
                    secondary="John Doe - 2 hours ago"
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar><DomainIcon /></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Domain Analysis"
                    secondary="example.com - 4 hours ago"
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar><EmailIcon /></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Email Investigation"
                    secondary="user@domain.com - 1 day ago"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
